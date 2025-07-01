const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importamos el paquete CORS
const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder leer cuerpos JSON
app.use(bodyParser.json());

// Habilitar CORS para que el frontend pueda hacer peticiones
app.use(cors());

// Almacenar los datos recibidos temporalmente
let sensorData = {
    soilHumidity: 0,
    airHumidity: 0
};

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta POST para recibir datos de los sensores desde Wokwi
app.post('/getSensorData', (req, res) => {
    const { soilHumidity, airHumidity } = req.body;

    console.log('Humedad del Suelo:', soilHumidity);
    console.log('Humedad del Aire:', airHumidity);

    // Almacenar los datos recibidos
    sensorData = { soilHumidity, airHumidity };

    // Enviar respuesta de éxito
    res.status(200).send({
        message: 'Datos recibidos correctamente',
        soilHumidity: soilHumidity,
        airHumidity: airHumidity
    });
});

// Ruta GET para enviar los datos al frontend
app.get('/getSensorData', (req, res) => {
    // Enviar los datos al frontend
    res.status(200).json(sensorData);
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
