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

// Estado de los LEDs (simulación de los LEDs en el backend)
let ledStatus = {
    greenLED: false,  // Riego automático
    redLED: false     // Regar ahora
};

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta POST para recibir datos de los sensores desde Wokwi
app.post('/getSensorData', (req, res) => {
    const { soilHumidity, airHumidity, waterNow, autoWatering } = req.body;

    console.log('Humedad del Suelo:', soilHumidity);
    console.log('Humedad del Aire:', airHumidity);
    console.log('Acción Regar Ahora:', waterNow);
    console.log('Acción Riego Automático:', autoWatering);

    // Almacenar los datos de los sensores
    sensorData = { soilHumidity, airHumidity };

    // Controlar el estado de los LEDs basado en los valores enviados desde el frontend
    if (waterNow) {
        ledStatus.redLED = true;  // Enciende el LED rojo (regar ahora)
    } else {
        ledStatus.redLED = false; // Apaga el LED rojo
    }

    if (autoWatering) {
        ledStatus.greenLED = true;  // Enciende el LED verde (riego automático)
    } else {
        ledStatus.greenLED = false; // Apaga el LED verde
    }

    // Enviar respuesta de éxito
    res.status(200).send({
        message: 'Datos recibidos correctamente',
        sensorData: sensorData,
        ledStatus: ledStatus // Enviar el estado de los LEDs
    });
});

// Ruta GET para enviar los datos al frontend
app.get('/getSensorData', (req, res) => {
    // Enviar los datos de los sensores y el estado de los LEDs al frontend
    res.status(200).json({
        sensorData: sensorData,
        ledStatus: ledStatus
    });
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
