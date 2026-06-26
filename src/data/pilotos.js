export const CLAVE_CACHE_PILOTOS = 'f1_drivers_cache_v2';

export const ESTADISTICAS_RESPALDO = [
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

export const PILOTOS_RESPALDO = [
  { driver_number: 1, full_name: 'Max Verstappen', name_acronym: 'VER', team_name: 'Red Bull Racing', team_colour: '3671C6' },
  { driver_number: 4, full_name: 'Lando Norris', name_acronym: 'NOR', team_name: 'McLaren', team_colour: 'FF8000' },
  { driver_number: 16, full_name: 'Charles Leclerc', name_acronym: 'LEC', team_name: 'Ferrari', team_colour: 'E80020' },
  { driver_number: 81, full_name: 'Oscar Piastri', name_acronym: 'PIA', team_name: 'McLaren', team_colour: 'FF8000' },
  { driver_number: 55, full_name: 'Carlos Sainz', name_acronym: 'SAI', team_name: 'Ferrari', team_colour: 'E80020' },
  { driver_number: 63, full_name: 'George Russell', name_acronym: 'RUS', team_name: 'Mercedes', team_colour: '27F4D2' },
  { driver_number: 44, full_name: 'Lewis Hamilton', name_acronym: 'HAM', team_name: 'Mercedes', team_colour: '27F4D2' },
  { driver_number: 11, full_name: 'Sergio Perez', name_acronym: 'PER', team_name: 'Red Bull Racing', team_colour: '3671C6' },
  { driver_number: 14, full_name: 'Fernando Alonso', name_acronym: 'ALO', team_name: 'Aston Martin', team_colour: '229971' },
  { driver_number: 22, full_name: 'Yuki Tsunoda', name_acronym: 'TSU', team_name: 'RB', team_colour: '6692FF' },
  { driver_number: 27, full_name: 'Nico Hulkenberg', name_acronym: 'HUL', team_name: 'Haas F1 Team', team_colour: 'B6BABD' },
  { driver_number: 10, full_name: 'Pierre Gasly', name_acronym: 'GAS', team_name: 'Alpine', team_colour: '0093CC' },
  { driver_number: 18, full_name: 'Lance Stroll', name_acronym: 'STR', team_name: 'Aston Martin', team_colour: '229971' },
  { driver_number: 31, full_name: 'Esteban Ocon', name_acronym: 'OCO', team_name: 'Alpine', team_colour: '0093CC' },
  { driver_number: 23, full_name: 'Alexander Albon', name_acronym: 'ALB', team_name: 'Williams', team_colour: '64C4FF' },
  { driver_number: 87, full_name: 'Oliver Bearman', name_acronym: 'BEA', team_name: 'Haas F1 Team', team_colour: 'B6BABD' },
  { driver_number: 30, full_name: 'Liam Lawson', name_acronym: 'LAW', team_name: 'RB', team_colour: '6692FF' },
  { driver_number: 2, full_name: 'Logan Sargeant', name_acronym: 'SAR', team_name: 'Williams', team_colour: '64C4FF' }
];

export function enriquecerPiloto(piloto) {
  const estadisticas = ESTADISTICAS_RESPALDO.find(item => item.driver_number === piloto.driver_number);
  return {
    ...piloto,
    points: estadisticas ? estadisticas.points : 0,
    wins: estadisticas ? estadisticas.wins : 0,
    podiums: estadisticas ? estadisticas.podiums : 0
  };
}

export function obtenerPilotosRespaldo() {
  return PILOTOS_RESPALDO.map(piloto => enriquecerPiloto(piloto));
}
