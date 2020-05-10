from flask import Flask

app = Flask(__name__)

@app.route("/", methods=['GET'])

def obtenerUltimosIndicadores():
    return "Hola somos los indicadores"

if __name__ == "__main__":
    app.run(host='localhost', port=5000)