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
  actualizarContador(tiempo);
  //se inicia el contador
});

let iniciarFormulario = ``;
//funciones
let actualizarContador = function (tiempo) {
  let tiempoRestante = parseInt(tiempo);
  setInterval(function() {
    document.getElementById('contador_tiempo').innerText = `Tiempo restante: ${tiempoRestante} segundos`;
    tiempoRestante--;
    if (tiempoRestante <= 0) {
      let aviso = "Se acabó el tiempo";
      document.getElementById('contador_tiempo').innerText = aviso;
    }
    tiempoRestante--;
  }, 1000);
}
//se carga
//se ejecuta el tiempoRestante
//le dice, que se acabó el tiempo
//le manda solicitud a la replika

// Actualizar el contador cada segundo (1000 milisegundos)




