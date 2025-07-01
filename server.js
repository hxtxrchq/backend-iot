const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // Permitir solicitudes JSON

// Ruta para recibir los datos del sensor
app.post('/getSensorData', (req, res) => {
    const { soilHumidity, airHumidity } = req.body;

    // Muestra los datos recibidos en la consola
    console.log('Humedad del Suelo:', soilHumidity);
    console.log('Humedad del Aire:', airHumidity);

    // Responde al ESP32 con un mensaje de éxito
    res.status(200).send({ message: 'Datos recibidos correctamente' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
