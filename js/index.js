//VARIABLES
const formulario = document.querySelector('.form');
const resultado = document.querySelector('#resultado');
const textoResultado = document.querySelector('.resultado-text-default');

//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', inputUsuario);
})



//FUNCIONES
function inputUsuario(e) {
   e.preventDefault();

   const ciudad = document.querySelector('#ciudad').value;
   const pais = document.querySelector('#pais').value;

   if(ciudad === '' || pais === '') {
       mostrarMensaje('Todos los campos son necesarios')
   }
   
   API(ciudad, pais)
}

function mostrarMensaje(mensaje) {
   const divMensaje = document.createElement('p');
   divMensaje.textContent = mensaje;
   divMensaje.classList.add('bg-danger', 'text-white', 'p-4', 'mt-5', 'divMensaje')
   formulario.appendChild(divMensaje);

   setTimeout(() => {
       divMensaje.remove()
       formulario.reset()
   }, 3000);
  
}

function API(ciudad, pais) {
    const ID = 'cf596d7278c477a5dd3784e9a1931ec6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${ID}&lang=es`;
    console.log(url)

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(datos => {
          limpiarHTML();
          if(datos.cod === '404') {
              mostrarMensaje('Ciudad no encontrada');
          }

      mostrarDatos(datos);
      })
}

function mostrarDatos(datos) {
    console.log(datos)
    const {name ,main: {temp ,temp_min, temp_max}, sys:{country} , weather: [{description}]} = datos;
    const tempActual = ktoC(temp);
    const min = ktoC(temp_min);
    const max = ktoC(temp_max);
    const nombre = name;
    const pais = country;
    const CapDes = description.charAt(0).toUpperCase() + description.slice(1);

    const divContenido = document.createElement('div');
    divContenido.innerHTML = `
    <p class="name">Temperatura en: <br> ${nombre}, ${pais}</p>
    <p class="description"> ${CapDes} </p>
    <p class="actual">Actual: ${tempActual} &#8451</p>
    <p class="min">Min: ${min} &#8451</p>
    <p class="max">Max: ${max} &#8451</p>
    `;
    resultado.appendChild(divContenido)
}

function ktoC(g) {
    return parseInt(g - 273.15);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}