const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Enable CORS for all origins
app.use(cors());

// Absolute path to your JSON folder (change this to your actual folder)
const jsonFolder = path.resolve('C:/Users/25sptseung/Desktop/data');

console.log('Serving JSON files from:', jsonFolder);

// Serve static JSON files at /data route
app.use('/data', express.static(jsonFolder));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
