const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route to receive sensor data
app.post('/sensordata', (req, res) => {
  const data = req.body;
  console.log("Sensor Data Received:", data);
  
  // You can push this to Firebase or a database here
  res.status(200).json({ message: 'Data received successfully' });
});

// Optional ping route
app.get('/sensordata', (req, res) => {
  res.send("Ping OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
