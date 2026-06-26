const API_URL = 'https://api.openf1.org/v1/drivers?session_key=9161';
const BACKBACK_DRIVERS = [
  { driver_number: 1, points: 393, wins: 15, podiums: 20 },
  { driver_number: 4, points: 331, wins: 3, podiums: 12 },
  { driver_number: 16, points: 307, wins: 3, podiums: 11 },
  { driver_number: 81, points: 262, wins: 2, podiums: 7 },
  { driver_number: 55, points: 244, wins: 2, podiums: 8 },
  { driver_number: 63, points: 192, wins: 1, podiums: 3 },
  { driver_number: 44, points: 190, wins: 2, podiums: 5 },
  { driver_number: 11, points: 152, wins: 0, podiums: 4 },
  { driver_number: 14, points: 62, wins: 0, podiums: 0 },
  { driver_number: 22, points: 28, wins: 0, podiums: 0 },
  { driver_number: 27, points: 31, wins: 0, podiums: 0 },
  { driver_number: 10, points: 26, wins: 0, podiums: 0 },
  { driver_number: 18, points: 24, wins: 0, podiums: 0 },
  { driver_number: 31, points: 23, wins: 0, podiums: 0 },
  { driver_number: 23, points: 12, wins: 0, podiums: 0 },
  { driver_number: 87, points: 7, wins: 0, podiums: 0 },
  { driver_number: 30, points: 4, wins: 0, podiums: 0 },
  { driver_number: 2, points: 0, wins: 0, podiums: 0 }
];



let allDrivers = [];
let favorites = JSON.parse(localStorage.getItem('f1_favorites')) || [];

const driversGrid = document.getElementById('drivers-grid');
const statusMessage = document.getElementById('status-message');
const searchInput = document.getElementById('search-input');
const teamFilter = document.getElementById('team-filter');
const sortSelect = document.getElementById('sort-select');

async function fetchDrivers() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2500); 

  try {
    const cachedDrivers = localStorage.getItem('f1_drivers_cache_v2');
    if (cachedDrivers) {
      clearTimeout(timeoutId);
      allDrivers = JSON.parse(cachedDrivers);
      inicializarApp();
      return;
    }

    const response = await fetch(API_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    
    if (!data || data.length === 0) throw new Error('Datos vacíos');

    
    const apiDrivers = Array.from(new Map(data.map(d => [d.driver_number, d])).values());

    
    

    allDrivers = apiDrivers.map(apiDriver => {
      const stats = BACKBACK_DRIVERS.find(d => d.driver_number === apiDriver.driver_number) || { points: 0, wins: 0, podiums: 0 };
      return { ...apiDriver, ...stats };
    });

    localStorage.setItem('f1_drivers_cache_v2', JSON.stringify(allDrivers));
    inicializarApp();
    
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn("Usando base de datos local enriquecida por falla en API.", error);
    
    allDrivers = BACKBACK_DRIVERS.map(d => {
      let name = "Piloto " + d.driver_number;
      let team = "Escudería F1";
      let color = "FFFFFF";
      let acronym = "PIL";

      if (d.driver_number === 1) { name = "Max VERSTAPPEN"; team = "Red Bull Racing"; color = "3671C6"; acronym = "VER"; }
      if (d.driver_number === 4) { name = "Lando NORRIS"; team = "McLaren"; color = "FF8000"; acronym = "NOR"; }
      if (d.driver_number === 16) { name = "Charles LECLERC"; team = "Ferrari"; color = "E10600"; acronym = "LEC"; }
      if (d.driver_number === 81) { name = "Oscar PIASTRI"; team = "McLaren"; color = "FF8000"; acronym = "PIA"; }
      if (d.driver_number === 55) { name = "Carlos SAINZ"; team = "Ferrari"; color = "E10600"; acronym = "SAI"; }
      if (d.driver_number === 63) { name = "George RUSSELL"; team = "Mercedes"; color = "27CCB5"; acronym = "RUS"; }
      if (d.driver_number === 44) { name = "Lewis HAMILTON"; team = "Mercedes"; color = "27CCB5"; acronym = "HAM"; }
      if (d.driver_number === 11) { name = "Sergio PEREZ"; team = "Red Bull Racing"; color = "3671C6"; acronym = "PER"; }

      return {
        driver_number: d.driver_number,
        full_name: name,
        team_name: team,
        team_colour: color,
        name_acronym: acronym,
        points: d.points,
        wins: d.wins,
        podiums: d.podiums
      };
    });

    inicializarApp();
  }
}


function inicializarApp() {
  statusMessage.style.display = 'none';
  populateTeamsFilter();
  
  sortSelect.innerHTML = `
    <option value="points">Ordenar por Puntos (Campeonato)</option>
    <option value="wins">Ordenar por Victorias 🏆</option>
    <option value="name">Ordenar por Nombre (A-Z)</option>
    <option value="number">Ordenar por Número de Auto</option>
  `;
  
  filterAndSortDrivers();
}

function renderDrivers(driversList) {
  driversGrid.innerHTML = '';

  if (driversList.length === 0) {
    driversGrid.innerHTML = '<p class="message">🟨 Bandera Amarilla: No se encontraron pilotos con esos filtros.</p>';
    return;
  }

  driversList.forEach(driver => {
    const isFav = favorites.some(fav => fav.driver_number === driver.driver_number);
    
    const card = document.createElement('div');
    card.className = 'driver-card';
    card.style.borderLeft = `6px solid #${driver.team_colour || 'FFFFFF'}`;
    
    card.innerHTML = `
      <div class="card-header">
        <span class="driver-number">#${driver.driver_number || 'N/A'}</span>
        <button class="fav-btn">${isFav ? '❤️' : '♡'}</button>
      </div>
      
      <h3>${driver.full_name || 'Piloto Desconocido'}</h3>
      
      <div class="driver-info">
        <p><strong>Escudería:</strong> ${driver.team_name || 'Independiente'}</p>
        <p><strong>Sigla:</strong> ${driver.name_acronym || '---'}</p>
      </div>
      
      <div class="stats-container">
        <div>
          <span class="stat-points">${driver.points ?? 0}</span>
          <small>Ptos</small>
        </div>
        <div>
          <span class="stat-wins">${driver.wins ?? 0}</span>
          <small>Victorias</small>
        </div>
        <div>
          <span class="stat-podiums">${driver.podiums ?? 0}</span>
          <small>Podios</small>
        </div>
      </div>
    `;

    card.querySelector('.fav-btn').addEventListener('click', () => toggleFavorite(driver));
    driversGrid.appendChild(card);
  });
}

function populateTeamsFilter() {
  const teams = [...new Set(allDrivers.map(d => d.team_name).filter(Boolean))];
  teamFilter.innerHTML = '<option value="">Todas las escuderías</option>';
  teams.forEach(team => {
    const option = document.createElement('option');
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
  });
}

function filterAndSortDrivers() {
  const query = searchInput.value.toLowerCase();
  const selectedTeam = teamFilter.value;
  const criteria = sortSelect.value;

  let results = allDrivers.filter(driver => {
    const matchesSearch = driver.full_name?.toLowerCase().includes(query) ||
                          driver.name_acronym?.toLowerCase().includes(query);
    const matchesTeam = selectedTeam === '' || driver.team_name === selectedTeam;
    return matchesSearch && matchesTeam;
  });

  results.sort((a, b) => {
    if (criteria === 'name') {
      return (a.full_name || '').localeCompare(b.full_name || '');
    }
    if (criteria === 'wins') {
      return b.wins - a.wins; 
    }
    if (criteria === 'number') {
      return a.driver_number - b.driver_number;
    }
    return b.points - a.points;
  });

  renderDrivers(results);
}

function toggleFavorite(driver) {
  const index = favorites.findIndex(fav => fav.driver_number === driver.driver_number);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(driver)
  }
  localStorage.setItem('f1_favorites', JSON.stringify(favorites));
  filterAndSortDrivers();
}

searchInput.addEventListener('input', filterAndSortDrivers);
teamFilter.addEventListener('change', filterAndSortDrivers);
sortSelect.addEventListener('change', filterAndSortDrivers);

fetchDrivers();
function actualizarEnlacesNavegacion() {
  const paginaActual = window.location.pathname.split('/').pop();

  const btnInicio = document.getElementById('btn-inicio') || document.querySelector('a[href*="index.html"]');
  const btnFavoritos = document.getElementById('btn-favoritos') || document.querySelector('a[href*="favoritos.html"]');

  if (!btnInicio || !btnFavoritos) return;

  btnInicio.classList.remove('active');
  btnFavoritos.classList.remove('active');

  if (paginaActual === 'favoritos.html') {
    btnFavoritos.classList.add('active');
  } else {
    btnInicio.classList.add('active');
  }
}

actualizarEnlacesNavegacion();