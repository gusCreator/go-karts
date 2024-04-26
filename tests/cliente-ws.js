function solicitudAccionarServicio() {
  const socket = new WebSocket('ws://localhost:3000');
  socket.addEventListener('open', function (event) {
    console.log("Conexión WS abierta");
    
    const solicitud =  {
      action: 'actionService'
    };
    socket.send(JSON.stringify(solicitud));
  });

  socket.addEventListener('message', function (event) {
    console.log("Mensaje recibido del WebSocket");
  })

  socket.addEventListener('close', function (event) {
    console.log('Conexión WebSocket Cerrada');
  })

  socket.addEventListener('error', function (event) {
    console.log('Error en la conexión WebSocket');
  })

  return socket;
}
