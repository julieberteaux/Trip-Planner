const listLongLat = [
  { location: 'Paris', longitude: '48.85', latitude: '2.35' },
  { location: 'ubud', longitude: '-8.5', latitude: '115.26' },
  { location: 'Ubud', longitude: '-8.5', latitude: '115.26' },
  { location: 'Canggu', longitude: '-8.64', latitude: '115.13' },
  { location: 'Gili', longitude: '-8.34', latitude: '116.03' },
];

function getLatitudeLongitude(city) {
  for (var i in listLongLat) {
    var ref = listLongLat[i];
    if (city.location === ref.location) {
      var latitude = ref.latitude;
      var longitude = ref.longitude;
    }
  }
  return { latitude, longitude };
}

export default getLatitudeLongitude;
