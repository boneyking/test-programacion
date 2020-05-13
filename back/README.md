# Ejecución de backend
- Ir a ruta donde se encuentra el archivo server.py, ejemplo: "E:\personal\test-programacion\back"
- Abrir una consola, escribir esta línea:
    - pip install --upgrade -r requirements.txt . Con esto se instalan las dependencias a utilizar en proyecto.
    - server.py runserver . Con esto levantamos el servidor de python.
    - Esto será levantado en el puerto 5001. Las rutas de la api para consultar son:
        - http://localhost:5001/api/ultimosIndicadores
        - http://localhost:5001/api/indicador/<nombre_indicador> Donde nombre_indicador corresponde al indicador a buscar, por ejemplo "cobre".
        - http://localhost:5001/api/indicador/<nombre_indicador>?fecha=<fecha> Donde "nombre_indicador" corresponde al indicador a buscar, por ejemplo "cobre" y "fecha" a la fecha a consultar en formato DD-MM-YYYY.
