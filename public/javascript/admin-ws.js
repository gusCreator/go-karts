function socketAdmin(message) {
  const socket = new WebSocket('ws://localhost:3000');

  socket.onopen = () => {
    messageString = JSON.stringify(message);
    socket.send(messageString);
  };

  socket.onmessage = (event) => {
    //MOstrar mensaje de alerta sobre el carro que se quiere activaremos
    const solicitud = JSON.parse(event.data);
    if(solicitud.accion == 'bienvenido')
      return;
    let res = null;
    if(solicitud.accion  == 'activarServicio'){
      const conf = confirm(`Activar servicio de kart\nPlaca: ${solicitud.parametros.placa}`);
      if(conf){
        res = {
          accion: "aceptarServicio",
          origen: "administrador",
          parametros: {
            placa: solicitud.parametros.placa
          }
        };
        document.getElementById(solicitud.parametros.placa).innerHTML = "Disponible: false";
        
      }else{
        res = {
          accion: "negarServicio",
          origen: "administrador",
          parametros: {
            placa: solicitud.parametros.placa
          }
        };
      }
    }else{
      res = {
        accion: "sinReconocer",
        origen: "administrador",
        parametros: {
          placa: solicitud.parametros.placa
        }
      }
    }
    const messageString = JSON.stringify(res);
    socket.send(messageString);
  };

  socket.onclose = () => {
    console.log('Conexión WebSocket Cerrada');
  };

  socket.onerror = (error) => {
    console.log('Error en la conexión WebSocket: ', error);
  };
}
