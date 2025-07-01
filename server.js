const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para poder leer cuerpos JSON
app.use(bodyParser.json());

// Ruta por defecto que devuelve un mensaje
app.get('/', (req, res) => {
    res.send('Backend corriendo correctamente');
});

// Ruta POST para recibir datos de los sensores
app.post('/getSensorData', (req, res) => {
    const { soilHumidity, airHumidity } = req.body;

    console.log('Humedad del Suelo:', soilHumidity);
    console.log('Humedad del Aire:', airHumidity);

    // Enviar respuesta de éxito
    res.status(200).send({ message: 'Datos recibidos correctamente' });
});

// Inicializa el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
