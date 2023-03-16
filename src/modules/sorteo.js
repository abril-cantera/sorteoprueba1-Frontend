export function sorteo(input, agregar, ganador, jugadores) {
  const $input = document.getElementById(input),
    $agregar = document.getElementById(agregar),
    $ganador = document.getElementById(ganador),
    $jugadores = document.getElementById(jugadores);

  let jugadoresArray = [];

  const agregarJugadores = () => {
    const inputValue = $input.value;
    if (inputValue === "" || inputValue.length === 0) {
      alert("No has ingresado participante");
    } else if (jugadoresArray.includes(inputValue)) {
      alert('Nombre repetido')
    } else {
      jugadoresArray.push(inputValue);

      $jugadores.insertAdjacentHTML("beforeend", `<li>${inputValue}</li>`);

      $input.value = "";
    }
  };
  const ganadorSorteo = () => {
    $input.focus();
    const random = Math.floor(Math.random() * jugadoresArray.length);
    const jugadorGanador = jugadoresArray[random];
    jugadoresArray = [];
    const winner = jugadorGanador

    postData(winner)

    setTimeout(() => {
      $jugadores.innerHTML = [];
    }, 2000);
    alert(`El ganador es ${jugadorGanador}`);
  };



  //boton enter
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      agregarJugadores()
    }
  })


  $agregar.addEventListener("click", () => {
    agregarJugadores();
  });


  $ganador.addEventListener("click", () => {
    if (jugadoresArray.length === 0) {
      alert("No has ingresado participantes");
    } else {
      ganadorSorteo();
    }
  });
}

const btnWinners = document.getElementById('btnGanadores')
btnWinners.addEventListener('click', getData)
const btnSorteo = document.getElementById('btnSorteo')
btnSorteo.addEventListener('click', getSorteo)

function getSorteo() {
  const sorteoContainer = document.getElementById('sorteo-container')
  const containerWinners = document.getElementById('ganadores')
  sorteoContainer.classList.remove('inactive')
  containerGanadoresPrincipal.classList.add('inactive')
}

const api = 'http://18.116.45.121:3000/api/v1/winners'
async function getData() {
  const response = await fetch(api);
  const data = await response.json();
  //
  const sorteoContainer = document.getElementById('sorteo-container')
  const containerWinners = document.getElementById('ganadores')
  const containerGanadoresPrincipal = document.getElementById('containerGanadoresPrincipal')
  //
  sorteoContainer.classList.add('inactive')
  containerGanadoresPrincipal.classList.remove('inactive')
  //
  const section = document.createElement('section')
  containerWinners.innerHTML = "";

  data.map(item => {
    var p = document.createElement('p')
    p.innerText = item.nameWinner
    p.classList.add('text')
    section.appendChild(p)
    containerWinners.appendChild(section)
  });
}

async function postData(name) {
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nameWinner: name
    }),
  });

  console.log('Save');
}