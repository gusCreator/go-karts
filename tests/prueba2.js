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
    response.sefFile(path.resolve(_dirname, './Hola-Mundo.html'));
  }
);
