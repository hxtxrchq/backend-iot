const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importamos el paquete CORS
const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder leer cuerpos JSON
app.use(bodyParser.json());

// Habilitar CORS para que el frontend pueda hacer peticiones
app.use(cors());  // Permitir que el frontend acceda a la API

// Almacenar los datos recibidos temporalmente
let sensorData = {
    airTemperature: 0,  // Cambié esta variable por airTemperature
    airHumidity: 0
};

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta POST para recibir datos de los sensores desde Wokwi
app.post('/getSensorData', (req, res) => {
    const { airTemperature, airHumidity } = req.body;  // Cambié soilHumidity por airTemperature

    console.log('Temperatura del Aire:', airTemperature);  // Cambio en el log
    console.log('Humedad del Aire:', airHumidity);

    // Almacenar los datos recibidos
    sensorData = { airTemperature, airHumidity };  // Cambié la asignación

    // Enviar respuesta de éxito
    res.status(200).send({
        message: 'Datos recibidos correctamente',
        airTemperature: airTemperature,  // Cambié soilHumidity por airTemperature
        airHumidity: airHumidity
    });
});

// Ruta GET para enviar los datos de los sensores al frontend
app.get('/getSensorData', (req, res) => {
    // Enviar los datos al frontend
    res.status(200).json(sensorData);
});

// Imprimir todas las rutas disponibles en el servidor (Solo para propósitos de depuración)
app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // Si la ruta está definida
        console.log(`${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path}`);
    }
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
