import { CLAVE_CACHE_PILOTOS, enriquecerPiloto, obtenerPilotosRespaldo } from '../../data/pilotos.js';

let pilotosParaComparar = JSON.parse(localStorage.getItem('f1_favorites')) || [];

if (pilotosParaComparar.length < 2) {
  const pilotosGuardados = JSON.parse(localStorage.getItem(CLAVE_CACHE_PILOTOS)) || obtenerPilotosRespaldo();
  const pilotosSinRepetir = Array.from(new Map(pilotosGuardados.map(piloto => [piloto.driver_number, piloto])).values());

  pilotosParaComparar = pilotosSinRepetir.map(piloto => enriquecerPiloto(piloto));
}

const selectorPiloto1 = document.getElementById('piloto-1');
const selectorPiloto2 = document.getElementById('piloto-2');
const tableroComparacion = document.getElementById('tablero-comparacion');
const mensajeSinDatos = document.getElementById('mensaje-sin-datos');

function inicializarComparador() {
  if (pilotosParaComparar.length < 2) {
    mostrarMensajeSinDatos();
    if (tableroComparacion) tableroComparacion.style.display = 'none';
    return;
  }

  if (mensajeSinDatos) mensajeSinDatos.style.display = 'none';
  if (tableroComparacion) tableroComparacion.style.display = 'block';

  selectorPiloto1.textContent = '';
  selectorPiloto2.textContent = '';

  const piloto1Guardado = localStorage.getItem('comparador_p1');
  const piloto2Guardado = localStorage.getItem('comparador_p2');

  pilotosParaComparar.forEach((piloto, posicion) => {
    const opcion1 = crearOpcionPiloto(piloto);
    const opcion2 = crearOpcionPiloto(piloto);

    if (piloto1Guardado ? piloto.driver_number === parseInt(piloto1Guardado) : posicion === 0) {
      opcion1.selected = true;
    }

    if (piloto2Guardado ? piloto.driver_number === parseInt(piloto2Guardado) : posicion === 1) {
      opcion2.selected = true;
    }

    selectorPiloto1.appendChild(opcion1);
    selectorPiloto2.appendChild(opcion2);
  });

  selectorPiloto1.addEventListener('change', procesarComparacion);
  selectorPiloto2.addEventListener('change', procesarComparacion);

  procesarComparacion();
}

function crearOpcionPiloto(piloto) {
  const opcion = document.createElement('option');
  opcion.value = piloto.driver_number;
  opcion.textContent = `${piloto.full_name} (#${piloto.driver_number})`;
  return opcion;
}

function mostrarMensajeSinDatos() {
  if (!mensajeSinDatos) return;

  mensajeSinDatos.textContent = '';
  mensajeSinDatos.style.display = 'block';

  const titulo = document.createElement('p');
  titulo.className = 'error-title';
  titulo.textContent = 'No hay datos disponibles.';

  const texto = document.createElement('p');
  texto.className = 'muted-text';
  texto.textContent = 'Andá al Inicio para cargar la parrilla oficial por primera vez.';

  mensajeSinDatos.appendChild(titulo);
  mensajeSinDatos.appendChild(texto);
}

function procesarComparacion() {
  const idPiloto1 = parseInt(selectorPiloto1.value);
  const idPiloto2 = parseInt(selectorPiloto2.value);

  localStorage.setItem('comparador_p1', idPiloto1);
  localStorage.setItem('comparador_p2', idPiloto2);

  const piloto1 = pilotosParaComparar.find(piloto => piloto.driver_number === idPiloto1);
  const piloto2 = pilotosParaComparar.find(piloto => piloto.driver_number === idPiloto2);

  if (!piloto1 || !piloto2) return;

  const puntosPiloto1 = Number(piloto1.points) || 0;
  const puntosPiloto2 = Number(piloto2.points) || 0;
  const victoriasPiloto1 = Number(piloto1.wins) || 0;
  const victoriasPiloto2 = Number(piloto2.wins) || 0;
  const podiosPiloto1 = Number(piloto1.podiums) || 0;
  const podiosPiloto2 = Number(piloto2.podiums) || 0;

  document.getElementById('piloto1-puntos-valor').textContent = `${piloto1.name_acronym || 'P1'}: ${puntosPiloto1} Ptos`;
  document.getElementById('piloto2-puntos-valor').textContent = `${piloto2.name_acronym || 'P2'}: ${puntosPiloto2} Ptos`;

  document.getElementById('piloto1-victorias-valor').textContent = `${piloto1.name_acronym || 'P1'}: ${victoriasPiloto1} victorias`;
  document.getElementById('piloto2-victorias-valor').textContent = `${piloto2.name_acronym || 'P2'}: ${victoriasPiloto2} victorias`;

  document.getElementById('piloto1-podios-valor').textContent = `${piloto1.name_acronym || 'P1'}: ${podiosPiloto1} podios`;
  document.getElementById('piloto2-podios-valor').textContent = `${piloto2.name_acronym || 'P2'}: ${podiosPiloto2} podios`;

  actualizarBarras('puntos', piloto1, piloto2, puntosPiloto1, puntosPiloto2);
  actualizarBarras('victorias', piloto1, piloto2, victoriasPiloto1, victoriasPiloto2);
  actualizarBarras('podios', piloto1, piloto2, podiosPiloto1, podiosPiloto2);
}

function actualizarBarras(tipo, piloto1, piloto2, valorPiloto1, valorPiloto2) {
  const total = valorPiloto1 + valorPiloto2;
  const porcentajePiloto1 = total > 0 ? (valorPiloto1 / total) * 100 : 50;
  const porcentajePiloto2 = total > 0 ? (valorPiloto2 / total) * 100 : 50;

  const barraPiloto1 = document.getElementById(`piloto1-${tipo}-barra`);
  const barraPiloto2 = document.getElementById(`piloto2-${tipo}-barra`);

  let colorPiloto1 = `#${piloto1.team_colour || '3671C6'}`;
  let colorPiloto2 = `#${piloto2.team_colour || 'FF8000'}`;

  if (colorPiloto1.toUpperCase() === colorPiloto2.toUpperCase()) {
    colorPiloto2 = '#555555';
  }

  barraPiloto1.style.width = `${porcentajePiloto1}%`;
  barraPiloto2.style.width = `${porcentajePiloto2}%`;
  barraPiloto1.style.backgroundColor = colorPiloto1;
  barraPiloto2.style.backgroundColor = colorPiloto2;
}

inicializarComparador();
