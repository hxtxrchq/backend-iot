const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Para permitir recibir solicitudes con cuerpo JSON

// Ruta para recibir datos del sensor
app.post('/getSensorData', (req, res) => {
    const { soilHumidity, airHumidity } = req.body;

    console.log('Humedad del Suelo:', soilHumidity);
    console.log('Humedad del Aire:', airHumidity);

    // Enviar respuesta de éxito
    res.status(200).send({ message: 'Datos recibidos correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
