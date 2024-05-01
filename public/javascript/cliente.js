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
const placa = '<%= placa %>';
let tiempo = '<%= tiempo %>';
console.log('Tiempo: ', tiempo, '  placa: ', placa);
let tiempoRestante = 60; 

function actualizarContador() {
  document.getElementById('contador_tiempo').innerText = `Tiempo restante: ${tiempoRestante} segundos`;
  tiempoRestante--; // Decrementar el tiempo restante
}

// Actualizar el contador cada segundo (1000 milisegundos)
setInterval(actualizarContador, 1000);

