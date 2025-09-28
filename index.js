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

// Function to generate random sensor data
function generateRandomSensorData() {
  return {
    temperature: parseFloat((Math.random() * 40).toFixed(2)), // 0 to 40 °C
    humidity: parseFloat((Math.random() * 100).toFixed(2)),   // 0 to 100 %
    moisture: parseFloat((Math.random() * 100).toFixed(2)),   // 0 to 100 %
    light: parseFloat((Math.random() * 1000).toFixed(2)),     // 0 to 1000 lux
  };
}

// Periodically update latestSensorData with random values every 5 seconds
setInterval(() => {
  latestSensorData = generateRandomSensorData();
  console.log('🔄 Sensor Data Updated:', latestSensorData);
}, 5000);

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
