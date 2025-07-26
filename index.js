const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let latestSensorData = {}; // store the latest data

// POST endpoint to receive sensor data
app.post('/sensordata', (req, res) => {
  const { temperature, humidity, moisture, light } = req.body;
  latestSensorData = { temperature, humidity, moisture, light };
  console.log('Sensor Data Received:', latestSensorData);
  res.status(200).json({ message: 'Data received successfully' });
});

// GET endpoint to serve latest sensor data
app.get('/sensordata', (req, res) => {
  res.status(200).json(latestSensorData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
