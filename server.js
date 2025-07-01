const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder leer cuerpos JSON
app.use(bodyParser.json());

// Habilitar CORS para que el frontend pueda hacer peticiones
app.use(cors());

// Almacenar los datos de los sensores y las señales de los botones
let sensorData = {
    soilHumidity: 0,
    airHumidity: 0
};

let ledStatus = {
    redLED: false,  // LED de "regar ahora"
    greenLED: false // LED de "riego automático"
};

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta GET para obtener los datos de los sensores
app.get('/getSensorData', (req, res) => {
    res.status(200).json(sensorData);
});

// Ruta POST para recibir los datos de los botones y actualizar los LEDs
app.post('/controlLEDs', (req, res) => {
    const { waterNow, autoWatering } = req.body;

    console.log('Acción Regar Ahora:', waterNow);
    console.log('Acción Riego Automático:', autoWatering);

    // Almacenar los datos de los botones
    ledStatus.redLED = waterNow;
    ledStatus.greenLED = autoWatering;

    // Devolver los nuevos estados de los LEDs
    res.status(200).send({
        message: 'Estado de los LEDs actualizado',
        ledStatus: ledStatus
    });
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
