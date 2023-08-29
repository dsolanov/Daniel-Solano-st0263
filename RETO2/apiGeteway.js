const express = require('express');
const request = require('request');

const app = express();
const port = 3001;

app.get('/searchFiles', (req, res) => {
  // solicitud get al mserv2
  request.get('http://localhost:5003/search', (error, response, body) => {
    if (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      const fileList = JSON.parse(body).files;
      res.json({ files: fileList });
    }
  });
});

app.get('/listFiles', (req, res) => {
  request.get('http://localhost:5001/listFiles', (error, response, body) => {
    if (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      const fileList = JSON.parse(body).files;
      res.json({ files: fileList });
    }
  });
});

app.listen(port, () => {
  console.log(`API Gateway escuchando en el puerto: ${port}`);
});