const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes by serving the index.html file
// This is needed for client-side routing with React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3002;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
  console.log(`Network access: http://192.168.0.155:${port}`);
});