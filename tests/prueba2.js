const path = require('path');
const express = require('express');
const app = express();

app.listen(3000, 
  () => {
    console.log('Escuchando de nuevo');
  }
);

app.get('/',
  (request, response) => {
    response.sendFile(path.resolve(__dirname, './Hola-Mundo.html'));
  }
);
