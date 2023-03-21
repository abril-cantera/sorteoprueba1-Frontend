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
    let jugadorGanador = jugadoresArray[random];
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

  sorteoContainer.classList.add('inactive')
  containerGanadoresPrincipal.classList.remove('inactive')

  containerWinners.innerHTML = "";



  const contador = {};
  function contarYeliminar(array) {
    const resultado = [];
    array.map(item => {
      const valor = item.nameWinner;
      if (!contador[valor]) {
        contador[valor] = 1;
        resultado.push(valor);
      } else {
        contador[valor]++;
        resultado.sort(function (a, b) {
          return contador[b] - contador[a];
        })
      }

    })

    resultado.map((item, i) => {
      let cont = Object.values(contador)
      cont.sort(function (a, b) {
        return b - a
      })

      const section = document.createElement('section')
      var pNumber = document.createElement('p')
      var p = document.createElement('p')

      p.innerText = item
      pNumber.innerText = cont[i]

      section.classList.add('contadorWinners')
      p.classList.add('text')
      pNumber.classList.add('textNumber')

      section.appendChild(p)
      section.appendChild(pNumber)
      containerWinners.appendChild(section)
    })
    return resultado
  }
  const resultado = contarYeliminar(data)
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
  const data = await response.json()
  console.log('Save', data);
}