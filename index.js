const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let latestSensorData = {
  temperature: '--',
  humidity: '--',
  moisture: '--',
  light: '--',
};

app.post('/sensordata', (req, res) => {
  const { temperature, humidity, moisture, light } = req.body;

  if (
    typeof temperature === 'number' &&
    typeof humidity === 'number' &&
    typeof moisture === 'number' &&
    typeof light === 'number'
  ) {
    latestSensorData = { temperature, humidity, moisture, light };
    console.log('✅ Sensor Data Received:', latestSensorData);
    res.status(200).json({ message: 'Data received successfully' });
  } else {
    console.log('❌ Invalid sensor data received:', req.body);
    res.status(400).json({ message: 'Invalid sensor data format' });
  }
});

app.get('/sensordata', (req, res) => {
  res.status(200).json(latestSensorData);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
