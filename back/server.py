from flask import Flask, request
import requests
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

URL_ULTIMOS_INDICADORES = 'https://www.indecon.online/last'
URL_POR_TIPO_INDICADOR = 'https://www.indecon.online/values/{}'
URL_POR_FECHA_E_INDICADOR = 'https://www.indecon.online/date/{}/{}'

@app.route("/api/ultimosIndicadores", methods=['GET'])
def obtenerUltimosIndicadores():
    respuesta = requests.get(url=URL_ULTIMOS_INDICADORES)
    if respuesta.status_code != 200:
        return "Error en obtener últimos indicadores" , 500
    return respuesta.json()


@app.route("/api/indicador/<nombre_indicador>", methods=['GET'])
def obtenerIndicador(nombre_indicador):
    if request.args.get('fecha'):
        print("tiene fecha")
        respuesta = requests.get(url=URL_POR_FECHA_E_INDICADOR.format(nombre_indicador, request.args.get('fecha')))
    else:
        respuesta = requests.get(url=URL_POR_TIPO_INDICADOR.format(nombre_indicador))

    if respuesta.status_code != 200:
        return "Error en obtener indicador seleccionado", 500
    if respuesta.status_code == 200:
        data = respuesta.json()
        if request.args.get('fecha'):
            if data["value"] == None:
                return "No hay valores para la fecha indicada", 400
        
    if not respuesta.json():
        return "No existe información para el indicador seleccionado", 500
    return respuesta.json()


if __name__ == "__main__":
    app.run(host='localhost', port=5001)