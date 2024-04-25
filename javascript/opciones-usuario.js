document.addEventListener('DOMContentLoaded', function() {
  //obtencion de los elementos
  const boton_enviar = document.getElementById('boton_enviar');
  //ejecucion de la carga
  console.log('Cargando json');
  const cont_opciones = document.getElementById('opciones_carros');
  //cont_opciones.
  fetch('../json/cars.json')
    .then(ans => ans.json())
    .then(data => {
      cont_opciones.innerHTML = '<ul>';
      data.forEach(auto => {
        let item = `<li><input type="radio" name="opciones">${auto.placa}</li>`;
        cont_opciones.innerHTML += item;
      });
      cont_opciones.innerHTML += '</ul>';
    })
    .catch(error => console.log('Sorry, we were not able to read the json: ', error));

  //funcionalidad del boton_enviar
  boton_enviar.addEventListener('click', enviar);
});

function enviar () {
  const opciones = document.getElementsByName('opciones');
  for(let i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      alert('Se enviará la solicitud para el carro');
      //actualizar adm()
      return;
    }
  }
  alert('No seleccionó una acción');
}

