const karts = require('./public/json/cars.json');

const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const socket = require('./public/javascript/cliente-ws.js');
const {resolve} = require('dns');
const {stringify} = require('querystring');

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

app.get('/replika/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/html/loginAdmin.html'));
});

app.use(express.urlencoded({ extended: true }));

app.post('/replika/admin', (req, res) => {
  const {usuario, contraseña} = req.body;

  if(usuario == 'UnicoAdministrador' && contraseña == '12345678'){
    res.sendFile(path.resolve(__dirname, './public/html/admin.html'));

    const mensaje = {
      accion: "conectarAdministrador"
    };

    socket(mensaje);

  }else{
    res.status(401).end();
  }

});

app.get('/replika/client/:placa', (req, res) => {
  const placa = req.params.placa;
  const kart = karts.find(k => k.placa == placa);

  if(!kart)
    return res.status(404).json({ error: 'Kart no encontrado' });

  res.sendFile(path.resolve(__dirname, './public/html/waiting.html'));

  const mensaje = {
    accion: "activarServicio",
    origen: "cliente",
    parametros: {
      placa: placa
    }
  };

  socket(mensaje);

});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});


const wss = new WebSocket.Server({ server });
let admin = null;
const clients = {};
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {

    try {
      console.log("Mesaje recibido: " , message.toString());

      const data = JSON.parse(message);

      if(admin == null && data.accion == 'conectarAdministrador'){
        admin = ws;
        console.log("Administrador conectado");
        return;
      }


      if(admin != null){

        if(data.origen == 'cliente'){
          admin.send(message);
          clients[data.parametros.placa] = ws;
        }else{ // data.origen = 'administrador'
          
          if(data.accion == 'conectarAdministrador'){
            console.log("Administrador ya está conectado");
            ws.close();
            return;
          }

          const placa = data.parametros.placa;
          const kart = karts.find(k => k.placa == placa);

          if(data.accion == 'aceptarServicio') {
            // Aquí activaremos el servicio
            // La actualización del json se hará en 
            // la página del administrador

            kart.disponible = false;
            console.log("Activando Servicio");

            const mensaje = "Activado";

            clients[placa].send(mensaje);

          }else if(data.accion == 'negarServicio') {
            // Aquí desactivamos el servicio

            console.log("Servicio rechazado");
            const mensaje = "Rechazado";

            clients[placa].send(mensaje);
          }else{
            console.warn("Acción no reconocida", data.accion);
          }

        }


      }else {
        console.log("Administrador desconectado");
      }

    }catch (error) {
      console.error('Error al procesar el mensaje: ', error);
    }

  });


  ws.on('close', function close() {
    console.log("Cliente desconectado");
  });

});
