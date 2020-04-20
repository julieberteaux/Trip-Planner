import React, { Component } from 'react';
import leaflet from 'leaflet';
import 'leaflet-control-geocoder';

class Map extends Component {
  addTripMarker = () => {
    const listTrip = this.props.trip;
    const geocoder = leaflet.Control.Geocoder.nominatim();

    listTrip.forEach((city) => {
      var markerPlaneIcon = leaflet.icon({
        iconUrl: '/icons/map-plane-marker.png',
        iconSize: [45, 50],
        iconAnchor: [20, 50],
        popupAnchor: [4, -50],
      });

      geocoder.geocode(city.location, (results) => {
        var latLng = new leaflet.LatLng(results[0].center.lat, results[0].center.lng);
        console.log(city.location);

        var marker = leaflet
          .marker(latLng, { icon: markerPlaneIcon })
          .addTo(this.mymap)
          .bindPopup(
            'Destination: <strong>' +
              city.location +
              '</strong><br/>Start: <strong>' +
              city.startDate +
              '</strong><br/>End:<strong>' +
              city.endDate +
              '</strong>'
          );

        this.mapMarkers.push(marker);
      });
    });
  };

  // for (var i in listTrip) {
  //   var markerPlaneIcon = leaflet.icon({
  //     iconUrl: '/icons/map-plane-marker.png',
  //     iconSize: [45, 50],
  //     iconAnchor: [20, 50],
  //     popupAnchor: [4, -50],
  //   });
  //   var city = listTrip[i];
  //   var longitude = getLatitudeLongitude(city).longitude;
  //   var latitude = getLatitudeLongitude(city).latitude;
  //   // add the marker to the map
  //   var marker = leaflet
  //     .marker([longitude, latitude], { icon: markerPlaneIcon })
  //     .addTo(this.mymap)
  //     .bindPopup(
  //       'Destination: <strong>' +
  //         city.location +
  //         '</strong><br/>Start: <strong>' +
  //         city.startDate +
  //         '</strong><br/>End:<strong>' +
  //         city.endDate +
  //         '</strong>'
  //     );

  //   this.mapMarkers.push(marker);
  // }

  removeTripMarker = () => {
    for (var i = 0; i < this.mapMarkers.length; i++) {
      this.mymap.removeLayer(this.mapMarkers[i]);
    }
  };

  //   onMapClick = (e) => {
  //     this.popup
  //       .setLatLng(e.latlng)
  //       .setContent('You clicked the map at ' + e.latlng.toString())
  //       .openOn(this.mymap);
  //   };

  onMapClickAddTrip = (e) => {
    const geocoder = leaflet.Control.Geocoder.nominatim();
    let marker;
    geocoder.reverse(e.latlng, this.mymap.options.crs.scale(this.mymap.getZoom()), (results) => {
      var city = results[0];
      console.log(city);
      if (city) {
        if (marker) {
          marker
            .setLatLng(city.center)
            .setPopupContent(city.html || city.name)
            .openPopup();
        } else {
          marker = leaflet
            .marker(city.center)
            .bindPopup('You clicked the map at ' + city.name)
            .addTo(this.mymap)
            .openPopup();
          this.props.addLocationMap(city.name);
        }
      }
    });
  };

  componentDidMount() {
    this.mymap = leaflet.map('mapid').setView([-8.3405, 115.092], 9);
    this.mapMarkers = [];

    leaflet
      .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19,
      })
      .addTo(this.mymap);

    this.popup = leaflet.popup();
    this.mymap.on('click', this.onMapClickAddTrip);

    // this.addTrip();

    //leaflet.marker([-8.6478, 115.1385], {icon: markerPlaneIcon }).addTo(this.mymap).bindPopup("Test");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trip !== this.props.trip) {
      this.removeTripMarker();
      this.addTripMarker();
    }
  }

  render() {
    return <div id="mapid"></div>;
  }
}

export default Map;
