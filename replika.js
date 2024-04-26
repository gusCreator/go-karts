const path = require('path');
const express = require('express');
const app = express();
app.listen( 3000, () => {
  console.log('Comienzo de la aplicación');
});
app.get('/replika.app', (req, res) => {
  response.sendFile(path.resolve(__dirname, './public/html/user.html'));
});


app.get('/favicon.ico', 
  (req, res) => {
    res.status(204).end();
  }
);
