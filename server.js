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

// Variables para los LEDs
let ledStatus = {
    redLED: false,  // Para el LED de "regar ahora"
    greenLED: false // Para el LED de "riego automático"
};

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta GET para enviar los datos de los sensores al frontend
app.get('/getSensorData', (req, res) => {
    // Enviar los datos al frontend
    res.status(200).json({
        ...sensorData,
        ledStatus: ledStatus // También enviamos el estado de los LEDs
    });
});

// Ruta POST para recibir datos desde el frontend (estado de los LEDs y de los sensores)
app.post('/getSensorData', (req, res) => {
    const { soilHumidity, airHumidity, waterNow, autoWatering } = req.body; // Recibimos los datos y las acciones

    console.log('Humedad del Suelo:', soilHumidity);
    console.log('Humedad del Aire:', airHumidity);
    console.log('Acción Regar Ahora:', waterNow); // Verificamos el estado de "regar ahora"
    console.log('Acción Riego Automático:', autoWatering); // Verificamos el estado de "riego automático"

    // Almacenar los datos de los sensores
    sensorData = { soilHumidity, airHumidity };

    // Definir el estado de los LEDs según las acciones
    ledStatus.redLED = waterNow;  // Si se activa "regar ahora", el LED rojo se enciende
    ledStatus.greenLED = autoWatering;  // Si se activa "riego automático", el LED verde se enciende

    // Enviar respuesta de éxito
    res.status(200).send({
        message: 'Datos recibidos correctamente',
        soilHumidity: soilHumidity,
        airHumidity: airHumidity,
        ledStatus: ledStatus // Enviamos el estado de los LEDs
    });
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
