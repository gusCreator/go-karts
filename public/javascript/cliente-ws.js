const WebSocket = require('ws');
function socketCliente(message, res, placa) {
  const socket = new WebSocket('ws://localhost:3000');

  socket.onopen = () => {
    messageString = JSON.stringify(message);
    console.log("Mensaje a enviar: ", messageString);
    socket.send(messageString);
  };

  socket.onmessage = (event) => {
    const demoRes = JSON.parse(event.data);
    if(demoRes.accion == 'kartActivado')
      res.render('service', {placa: placa}); 
    else
      res.redirect('/replika');
  };

  socket.onclose = () => {
    console.log('Conexión WebSocket Cerrada');
  };

  socket.onerror = (error) => {
    console.log('Error en la conexión WebSocket: ', error);
  };

}
module.exports = socketCliente;
