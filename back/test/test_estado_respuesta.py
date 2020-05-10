import unittest
import requests

class TestEstadoRespuesta(unittest.TestCase):
    def test_error_cuando_fecha_no_tiene_formato(self):
        respuesta = requests.get(url='http://localhost:5000/indicador/cobre?fecha=02-01-2020')
        assert respuesta.status_code == 200