// const listLongLat = [
//   { location: 'Paris', longitude: '48.85', latitude: '2.35' },
//   { location: 'ubud', longitude: '-8.5', latitude: '115.26' },
//   { location: 'Ubud', longitude: '-8.5', latitude: '115.26' },
//   { location: 'Canggu', longitude: '-8.64', latitude: '115.13' },
//   { location: 'Gili', longitude: '-8.34', latitude: '116.03' },
// ];

function getCity(lat) {
  var city = '';
  if (lat <= '0') {
    city = 'Canggu';
  } else {
    city = 'Paris';
  }
  return city;
}

export default getCity;
