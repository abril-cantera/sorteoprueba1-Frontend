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
    // console.log(winner)

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

const api = 'http://18.116.45.121:3000/api/v1/winners'
async function getData() {
  const response = await fetch(api);
  const data = await response.json();
  console.log(data);
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
  const data = await response.json();
  console.log('Save');
}
getData()
