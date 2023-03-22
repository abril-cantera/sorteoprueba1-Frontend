export function sorteo(input, agregar, ganador, jugadores) {
  const $input = document.getElementById(input),
    $agregar = document.getElementById(agregar),
    $ganador = document.getElementById(ganador),
    $jugadores = document.getElementById(jugadores);

  let jugadoresArray = [];

  const notificacion = document.getElementById('notificacion')
  const text = document.getElementById('text')
  const btnNotificacion = document.getElementById('btnNotificacion')

  function notificacionAlerta(alerta) {
    notificacion.classList.add('notificacion')
    notificacion.classList.remove('inactive')
    btnNotificacion.addEventListener('click', closedNotification)
    text.innerText = alerta
  }
  function closedNotification() {
    notificacion.classList.add('inactive')
  }
  const agregarJugadores = () => {
    const inputValue = $input.value;
    if (inputValue === "" || inputValue.length === 0) {
      notificacionAlerta("No has ingresado participante")
    } else if (jugadoresArray.includes(inputValue)) {
      notificacionAlerta('Nombre repetido')
    } else {
      jugadoresArray.push(inputValue);
      $jugadores.classList.add('list-winners')
      $jugadores.insertAdjacentHTML("beforeend", `<li class="liPlayers">${inputValue}</li>`);

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
      $jugadores.classList.add('inactive')
    }, 4000);


    const contadorPrincipal = document.getElementById('contadorPrincipal')
    const contador = document.getElementById('contador')
    let n = 3

    notificacion.classList.toggle('inactive')
    const timer = setInterval(() => {
      if (!!winner && !!n) {
        contadorPrincipal.classList.remove('inactive');
        contador.innerHTML = `${n}`;
        n--;
      } else if (!!winner && n == 0) {
        contadorPrincipal.classList.add('inactive');
        clearInterval(timer);
        notificacionAlerta(`El ganador es ${jugadorGanador}`)
      }
    }, 1000);

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
      notificacionAlerta("No has ingresado participantes")
    } else {
      ganadorSorteo();
    }
  });
}

const btnWinners = document.getElementById('btnGanadores')
btnWinners.addEventListener('click', getData)

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