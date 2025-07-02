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
    soilHumidity: 0,
    airHumidity: 0
};

let ledStatus = {
    redLED: false,
    greenLED: false
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

// Ruta POST para controlar los LEDs (activar/desactivar)
app.post('/controlLEDs', (req, res) => {
    const { redLED, greenLED } = req.body;

    console.log('Control de LEDs:');
    console.log('LED Rojo (Regar Ahora):', redLED);
    console.log('LED Verde (Riego Automático):', greenLED);

    // Actualizar el estado de los LEDs
    ledStatus.redLED = redLED;
    ledStatus.greenLED = greenLED;

    // Enviar la respuesta de los estados de los LEDs
    res.status(200).send({
        message: 'Estado de los LEDs actualizado',
        ledStatus: ledStatus
    });
});

// Ruta GET para enviar los datos de los sensores al frontend
app.get('/getSensorData', (req, res) => {
    // Enviar los datos al frontend
    res.status(200).json(sensorData);
});

// Ruta GET para obtener el estado de los LEDs
app.get('/getLEDStatus', (req, res) => {
    // Enviar el estado actual de los LEDs
    res.status(200).json(ledStatus);
});

// Imprimir todas las rutas disponibles en el servidor (Solo para propósitos de depuración)
app._router.stack.forEach(function (middleware) {
    if (middleware.route) { // Si la ruta está definida
        console.log(${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path});
    }
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(Servidor escuchando en el puerto ${port});
});
