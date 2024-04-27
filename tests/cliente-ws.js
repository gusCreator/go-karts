const WebSocket = require('ws');
function solicitudAccionarServicio() {
  const socket = new WebSocket('ws://localhost:3000');

  socket.onopen = () => {
    console.log("Conexión WS abierta");
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

  return socket;

}
module.exports =  solicitudAccionarServicio;
