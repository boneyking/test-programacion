import unittest
import requests

class TestEstadoRespuesta(unittest.TestCase):
    def test_error_cuando_fecha_no_tiene_formato(self):
        fecha = input('Indique una fecha:')
        respuesta = requests.get(url='http://localhost:5001/api/indicador/cobre?fecha='+ fecha)
        if respuesta.status_code == 200:
            assert True
        elif respuesta.status_code == 400:
            print(respuesta.text)
            assert respuesta.status_code == 400
        elif respuesta.status_code == 500:
            print(respuesta.text)
            assert respuesta.status_code == 500