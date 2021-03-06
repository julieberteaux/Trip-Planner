import React, { Component } from 'react';
import leaflet from 'leaflet';
import 'leaflet-control-geocoder';
import moment from 'moment';
import { MDBContainer, MDBRow, MDBAlert } from 'mdbreact';

class Map extends Component {
  state = {
    erreurGeocode: false,
  };

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
        if (results[0]) {
          var latLng = new leaflet.LatLng(results[0].center.lat, results[0].center.lng);

          var marker = leaflet
            .marker(latLng, { icon: markerPlaneIcon })
            .addTo(this.mymap)
            .bindPopup(
              'Destination: <strong>' +
                city.location +
                '</strong><br/>Start: <strong>' +
                moment(city.startDate).format('YYYY-MM-DD') +
                '</strong><br/>End:<strong>' +
                moment(city.endDate).format('YYYY-MM-DD') +
                '</strong>'
            );

          this.mapMarkers.push(marker);
        } else {
          this.setState({ erreurGeocode: true });
        }
      });
    });
  };

  removeTripMarker = () => {
    for (var i = 0; i < this.mapMarkers.length; i++) {
      this.mymap.removeLayer(this.mapMarkers[i]);
    }
  };

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
    this.mymap = leaflet.map('mapid').setView([20, 40], 2);
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.trip !== this.props.trip) {
      this.removeTripMarker();
      this.addTripMarker();
    }
  }

  render() {
    return (
      <MDBContainer fluid style={{ paddingLeft: '0px', paddingRight: '0px' }}>
        <MDBRow>
          {this.state.erreurGeocode && (
            <MDBAlert dismiss color="warning">
              The location of your trip wasn't found on the map. You can try to edit it with a more detailed location.
            </MDBAlert>
          )}
        </MDBRow>

        <div id="mapid"></div>
      </MDBContainer>
    );
  }
}

export default Map;
