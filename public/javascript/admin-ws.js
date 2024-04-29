const WebSocket = require('ws');
function socketAdmin(message) {
  const socket = new WebSocket('ws://localhost:3000');

  socket.onopen = () => {
    console.log("Conexión WS abierta");

    messageString = JSON.stringify(message);
    console.log("Mensaje a enviar: ", messageString);
    socket.send(messageString);
  };

  socket.onmessage = (event) => {
    console.log("Mensaje recibido del servidor: ", event.data);
  };

  socket.onclose = () => {
    console.log('Conexión WebSocket Cerrada');
  };

  socket.onerror = (error) => {
    console.log('Error en la conexión WebSocket: ', error);
  };


}

module.exports = socketAdmin;
