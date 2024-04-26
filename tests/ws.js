const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.listen(3000, () => {
  console.log("Escuchando en port 3000")
});
app.get('/replika', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/html/user.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

wss.on('connection', function connection(ws) {

  console.log("Cliente se conectó al WS");

  ws.send("Beinvenido!!");

  ws.on('message', function incoming(message) {
    console.log("Mensaje desde el cliente: ", message);

    try {

      const data = JSON.parse(message);

      if(data.action == 'activeService') {
        // Aquí activaremos el servicio
        console.log("Activando Servicio de kart con placa ", data.placa);
      }else if(data.action == 'deactiveService') {
        // Aquí desactivamos el servicio
        console.log("Desactivando servicio de kart con placa ", data.placa);
      }else{
        console.warn("Acción no reconocida", data.action);
      }

    }catch (error) {
      console.error('Error al procesar el mensaje: ', error);
    }

  });


  ws.on('close', function close() {
    console.log("Cliente desconectado");
  });
});