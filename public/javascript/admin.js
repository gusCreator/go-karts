document.addEventListener('DOMContentLoaded', function() {
  fetch('/json/cars.json')
    .then(response => response.json())
    .then((data) => {
      const karts = data;
      const container = document.getElementById('data-karts');
      let content = '';
      console.log(karts);
      for(let i = 0; i < karts.length; i++){
        content += 
          `<div style="display:flex;flex-direction:column">
          <h3>Kart</h3>
          <h4>Placa: ${karts[i].placa}</h4>
          <h4>Marca: ${karts[i].marca}</h4>
          <h4>Modelo: ${karts[i].modelo}</h4>
          <h4 id="${karts[i].placa}">Disponible: ${karts[i].disponible}</h4>
          <h4>Característica: ${karts[i].caracteristica}</h4>
        </div>`;
      }
      container.innerHTML = content;
    })
    .catch((error) =>  {
      console.log(error);
    });


});

const mensaje = {
  accion: "conectarAdministrador"
};

socketAdmin(mensaje);
