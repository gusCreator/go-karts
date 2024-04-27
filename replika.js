const karts = require('./public/json/cars.json');

const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const socket = require('./public/javascript/cliente-ws.js');

const app = express();

const server = app.listen(3000, () => {
  console.log("Escuchando en port 3000")
});

app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.get('/replika', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/user.html'));
});

app.get('/replika/client/:placa', (req, res) => {
  const placa = req.params.placa;
  const kart = karts.find(k => k.placa == placa);

  if(!kart)
    return res.status(404).json({ error: 'Kart no encontrado' });

  res.sendFile(path.resolve(__dirname, './public/html/waiting.html'));

  const mensaje = {
    accion: "activarServicio",
    parametros: kart
  };

  socket(mensaje);

});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});


const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {

  console.log("Cliente se conectó al WS");

  ws.send("Beinvenido!!");

  ws.on('message', function incoming(message) {
    console.log("Mensaje desde el cliente: ", message.toString());

    try {

      const data = JSON.parse(message);

      if(data.accion == 'activarServicio') {
        // Aquí activaremos el servicio
        console.log("Activando Servicio");
        ws.send("Servicio ha sido activado");
      }else if(data.accion == 'desactivarServicio') {
        // Aquí desactivamos el servicio
        console.log("Desactivando servicio");
      }else{
        console.warn("Acción no reconocida", data.accion);
      }

    }catch (error) {
      console.error('Error al procesar el mensaje: ', error);
    }

  });


  ws.on('close', function close() {
    console.log("Cliente desconectado");
  });
});
