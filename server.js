const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importamos el paquete CORS
const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder leer cuerpos JSON
app.use(bodyParser.json());

// Habilitar CORS para que el frontend pueda hacer peticiones
app.use(cors());

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta POST para recibir datos de los sensores
app.post('/getSensorData', (req, res) => {
    const { airTemperatura, airHumidity } = req.body;

    console.log('Temperatura del Aire:', airTemperatura);
    console.log('Humedad del Aire:', airHumidity);

    // Aquí podrías realizar más procesamiento si es necesario

    // Enviar respuesta de éxito
    res.status(200).send({ 
        message: 'Datos recibidos correctamente',
        airTemperatura: airTemperatura,  // Devolver la temperatura del aire
        airHumidity: airHumidity     // Devolver la humedad del aire
    });
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
