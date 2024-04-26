const path = require('path');
const express = require('express');
const app = express();

app.listen(3000, 
  () => {
    console.log('Escuchando de nuevo');
  }
);

app.get('/api/',
  (request, response) => {
    response.sendFile(path.resolve(__dirname, '../public/json/cars.json'));
  }
);

app.get('/favicon.ico', 
  (req, res) => {
    res.status(204).end();
  }
);
