//contador de tiempo
//cuando termine el tiempo debe crear un web socket
// el tiempo se recibe como variable lo debes declarar en service.ejs
// miras como ejemplo waiting.ejs
// const time = 1000;
//   setTimeout( function() socketCLiente(), time);
//  const mensaje = {
//    accion: "kartTiomeout",


// Código JavaScript para el contador
// Aquí puedes utilizar cualquier técnica de contador que desees, por ejemplo:
console.log('Se cargó exitosamente cliente.js');

document.addEventListener('DOMContentLoaded', function() {
  console.log('Placa: ', placa, ' Tiempo: ', tiempo);
  actualizarContador(parseInt(tiempo) * 60);
  //se inicia el contador
});

let iniciarFormulario = ``;
//funciones
let actualizarContador = function (tiempoRestante) {
  setInterval(function() {
    let horas = Math.floor(tiempoRestante / 3600);
    let minutos = Math.floor(tiempoRestante % 3600 / 60);
    let segundos = tiempoRestante % 60;
    document.getElementById('contador_tiempo').innerText = `Tiempo restante: ${horas} horas, ${minutos} minutos, ${segundos} segundos`;
    tiempoRestante--;
    if (tiempoRestante <= 0) {
      let aviso = "Se acabó el tiempo";
      document.getElementById('contador_tiempo').innerText = aviso;

      // Creación de la comunicación WebSocket
      // Se envía un mensaje indicando que el tiempo del kart terminó

      const mensaje = {
        accion: 'kartTimeout',
        origen: 'cliente',
        parametros: {
          placa: placa
        }
      };
      alert("Kart terminó su servicio");
      socketCliente(mensaje);
      return;
    }
  }, 1000);
}
//se carga
//se ejecuta el tiempoRestante
//le dice, que se acabó el tiempo
//le manda solicitud a la replika

// Actualizar el contador cada segundo (1000 milisegundos)
async function socketCliente(mensaje) {

  const socket = new WebSocket('ws://localhost:3000');

  const messageString = JSON.stringify(mensaje);
  socket.onopen = () => {
    console.log("Conexión WS abierta");

    socket.send(messageString);
  };

  socket.onmessage = (event) => {
    // solo es posible que me envie un mensaje 
    const data = JSON.parse(event.data);
    if(data.accion == 'kartTerminóServicio'){
      // se redirige a la página principal
      window.location.href = "/replika";
    }else{
      console.log("Acción no reconocida", data);
    }
  };

  socket.onerror = (err) => {
    console.error("Error de conexión WS", err);
  };

  socket.onclose = () => {
    console.log("Se ha cerrado la conexión");
  }

}


