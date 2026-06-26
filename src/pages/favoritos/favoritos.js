const grillaFavoritos = document.getElementById('grilla-favoritos') || document.getElementById('grilla-pilotos');

let favoritos = JSON.parse(localStorage.getItem('f1_favorites')) || [];

function mostrarFavoritos() {
  if (!grillaFavoritos) return;

  grillaFavoritos.textContent = '';

  if (favoritos.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.className = 'message empty-message';
    mensaje.textContent = 'Tu garaje está vacío. Volvé al inicio y sumá tus pilotos favoritos.';
    grillaFavoritos.appendChild(mensaje);
    return;
  }

  favoritos.forEach(piloto => {
    grillaFavoritos.appendChild(crearTarjetaFavorito(piloto));
  });
}

function crearTarjetaFavorito(piloto) {
  const tarjeta = document.createElement('div');
  // CORREGIDO: Cambiado a 'driver-card'
  tarjeta.className = 'driver-card';
  tarjeta.style.borderLeft = `6px solid #${piloto.team_colour || 'FFFFFF'}`;

  const encabezado = document.createElement('div');
  // CORREGIDO: Cambiado a 'card-header'
  encabezado.className = 'card-header';

  const numero = document.createElement('span');
  // CORREGIDO: Cambiado a 'driver-number'
  numero.className = 'driver-number';
  numero.textContent = `#${piloto.driver_number}`;

  const botonEliminar = document.createElement('button');
  // CORREGIDO: Cambiado a 'fav-btn'
  botonEliminar.className = 'fav-btn boton-eliminar-favorito';
  botonEliminar.title = 'Eliminar de favoritos';
  botonEliminar.textContent = '×';
  botonEliminar.addEventListener('click', () => eliminarFavorito(piloto));

  encabezado.appendChild(numero);
  encabezado.appendChild(botonEliminar);

  const info = document.createElement('div');
  // CORREGIDO: Cambiado a 'driver-info'
  info.className = 'driver-info';

  const nombre = document.createElement('h3');
  nombre.textContent = piloto.full_name || 'Piloto';

  info.appendChild(nombre);
  info.appendChild(crearParrafoDato('Escudería:', piloto.team_name || 'Sin especificar'));
  info.appendChild(crearParrafoDato('Sigla:', piloto.name_acronym || 'N/A'));
  info.appendChild(crearEstadisticas(piloto));

  tarjeta.appendChild(encabezado);
  tarjeta.appendChild(info);

  return tarjeta;
}

function crearParrafoDato(etiqueta, valor) {
  const parrafo = document.createElement('p');
  const destacado = document.createElement('strong');

  destacado.textContent = `${etiqueta} `;
  parrafo.appendChild(destacado);
  parrafo.append(valor);

  return parrafo;
}

function crearEstadisticas(piloto) {
  const estadisticas = document.createElement('div');
  // CORREGIDO: Cambiado a 'stats-container'
  estadisticas.className = 'stats-container';

  // CORREGIDO: Cambiadas las clases de las estadísticas individuales
  estadisticas.appendChild(crearItemEstadistica(piloto.points, 'Ptos', 'stat-points'));
  estadisticas.appendChild(crearItemEstadistica(piloto.wins, 'Victorias', 'stat-wins'));
  estadisticas.appendChild(crearItemEstadistica(piloto.podiums, 'Podios', 'stat-podiums'));

  return estadisticas;
}

function crearItemEstadistica(valor, etiqueta, clase) {
  const item = document.createElement('div');
  const numero = document.createElement('span');
  const texto = document.createElement('small');

  numero.className = clase;
  numero.textContent = valor || 0;
  texto.textContent = etiqueta;

  item.appendChild(numero);
  item.appendChild(texto);

  return item;
}

function eliminarFavorito(piloto) {
  favoritos = favoritos.filter(favorito => favorito.driver_number !== piloto.driver_number);
  localStorage.setItem('f1_favorites', JSON.stringify(favoritos));
  mostrarFavoritos();
}

function activarBotonNavegacion() {
  const botonFavoritos = document.querySelector('a[href="/src/pages/favoritos/index.html"]');
  const botonInicio = document.querySelector('a[href="/index.html"]');

  if (botonFavoritos) botonFavoritos.classList.add('active');
  if (botonInicio) botonInicio.classList.remove('active');
}

mostrarFavoritos();
activarBotonNavegacion();