const karts = require('./public/json/cars.json');

const fs = require('fs');
const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const socketCliente = require('./public/javascript/cliente-ws.js');

const app = express();

const server = app.listen(3000, () => {
  console.log("Escuchando en port 3000")
});

app.set('view engine', 'ejs');
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

let admin = null;

app.post('/replika/admin', (req, res) => {
  const {usuario, contraseña} = req.body;

  if(usuario == 'UnicoAdministrador' && contraseña == '12345678' && admin == null){
    res.sendFile(path.resolve(__dirname, './public/html/admin.html'));
  }else{
    res.status(401).end();
  }

});

app.get('/replika/client/:placa', (req, res) => {

  const placa = req.params.placa;
  const kart = karts.find(k => k.placa == placa);

  if(!kart)
    return res.status(404).json({ error: 'Kart no encontrado' });

  res.render('time-client', {placa: placa});

});

app.post('/replika/client/solicitar', (req, res) => {

  const {placa, horas, minutos} = req.body;
  console.log('Placa a enviar', placa);
  const tiempo = horas * 60 + minutos;

  const mensaje = {
    accion: "activarServicio",
    origen: "cliente",
    parametros: {
      placa: placa
    }
  };
  socketCliente(mensaje, res, placa, tiempo);
});

app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});


const wss = new WebSocket.Server({ server });
const clients = {};
wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {

    try {
      const data = JSON.parse(message);

      if(admin == null && data.accion == 'conectarAdministrador'){
        admin = ws;
        console.log("Servidor WebSocket: Administrador conectado");
        const mensaje = {
          accion: "bienvenido"
        };
        const messageString = JSON.stringify(mensaje);
        admin.send(messageString);
        return;
      }


      if(admin != null){

        if(data.origen == 'cliente'){
          const messageString = JSON.stringify(data);
          //adm es el ws
          console.log('\n\nMensaje recibido por el adm', messageString);
          admin.send(messageString);
          clients[data.parametros.placa] = ws;
        }else{ // data.origen = 'administrador' en serio :v, me tomó bastante tiempo darme cuenta de eso asdfkjfsdfsdkñfdkñjlfdsklñ
          
          if(data.accion == 'conectarAdministrador'){
            console.log("Administrador ya está conectado");
            ws.close();
            return;
          }

          const placa = data.parametros.placa;
          const kart = karts.find(k => k.placa == placa);

          if(data.accion == 'aceptarServicio') {
            // Aquí activaremos el servicio
            // La actualización del json se hará aquí
            // en un método
            
            kart.disponible = false;
            console.log("Activando Servicio");

            updateJSON();

            const mensaje = {
              accion: "kartActivado"
            };
            const messageString = JSON.stringify(mensaje);

            console.log('\n\nMensaje al aceptar servicio', messageString);
            clients[placa].send(messageString);
            clients[placa].close();


          }else if(data.accion == 'negarServicio') {
            // Aquí desactivamos el servicio

            console.log("Servicio rechazado");
            const mensaje = {
              accion: "kartRechazado"
            };
            const messageString = JSON.stringify(mensaje);

            clients[placa].send(messageString);
            clients[placa].close();
          }else if(data.accion = 'kartTimeoutCompleted'){

            kart.disponible = true;
            console.log("Desactivando servicio del kart");

            updateJSON();

            const mensaje = {
              accion: "kartTerminóServicio"
            };
            const messageString = JSON.stringify(mensaje);

            clients[placa].send(messageString);
            clients[placa].close();
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
    if(ws == admin){
      console.log("Administrador desconectado");
      admin = null;
    }
  });

});

function updateJSON() {
  const actualKarts = JSON.stringify(karts);

  fs.writeFile('./public/json/cars.json', actualKarts, 'utf8', (err) => {
    if(err)
      console.error("Error al escribir en el archivo: ", err);
    else{
      console.log("Cars.json ha sido modificado correctamente");
    }
  });

}
