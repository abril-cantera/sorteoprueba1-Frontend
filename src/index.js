import { sorteo } from "./modules/sorteo.js";

const d = document;

//Esto carga todos los eventos al cargarse la pagina
d.addEventListener("DOMContentLoaded", () => {
  sorteo(
    "sorteo-dos",
    "agregar-jugador",
    "ganador-btn-dos",
    "lista-jugadores"
  );
});
