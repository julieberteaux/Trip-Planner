import React, { Component } from 'react';
import Planning from './Planning';
import Form from './Form';
import Modal from './Modal';
import Map from './Map';
import update from 'immutability-helper';
import { MDBContainer, MDBCol, MDBRow } from 'mdbreact';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './style.css';

class App extends Component {
  // list of trip
  state = {
    trip: [],
    //trip: [{location :'Canggu', startDate : '2020-04-10', endDate: '2020-04-18'},{location :'Chiang-Mai', startDate : '2020-05-10', endDate: '2020-06-18'},{location :'Paris', startDate : '2020-04-01', endDate: '2020-04-09'}],
    modal: false,
    tripToEdit: {},
    locationMap: '',
  };

  componentDidMount() {
    const tripString = localStorage.getItem('trip');
    if (tripString) {
      try {
        this.setState({ trip: JSON.parse(tripString) });
      } catch (e) {
        this.setState({ trip: [] });
      }
    } else {
      this.setState({ trip: [] });
    }
  }

  /*
    componentDidUpdate () {
        console.log('MIS A JOUR')
        const {trip} = this.state;
        localStorage.setItem('trip', JSON.stringify(trip))
    }
*/
  saveData = () => {
    console.log('MIS A JOUR');
    const { trip } = this.state;
    localStorage.setItem('trip', JSON.stringify(trip));
  };

  // change state of the modal
  toggle = (index) => {
    const { modal } = this.state;
    const { trip } = this.state;

    this.setState({
      modal: !modal,
      tripToEdit: { ...trip[index] },
      tripToEditIndex: index,
    });
  };

  // change state of location
  addLocationMap = (city) => {
    this.setState({
      locationMap: city,
    });
  };

  // change value of state from the modal
  handleChange = (event) => {
    const { name, value } = event.target;
    const { tripToEdit } = this.state;
    tripToEdit[name] = value;
    this.setState({
      tripToEdit,
    });
  };

  // submit change from the modal
  /* if we don't put an async method, the function might start setState and call saveData before finishing the setState part.
    To avoid this we put async (arguments) in the header of the function and await before the part we need to finish before going further */
  onFormSubmit = async (event) => {
    event.preventDefault();
    const { tripToEdit, tripToEditIndex } = this.state;
    await this.setState(
      update(this.state, {
        trip: {
          [tripToEditIndex]: {
            $set: tripToEdit,
          },
        },
        modal: {
          $set: false,
        },
      })
    );
    this.saveData();
  };

  // remove trip from the state based on its index
  removeTrip = async (index) => {
    const { trip } = this.state;

    await this.setState({
      trip: trip.filter((trip, i) => {
        return i !== index;
      }),
    });
    this.saveData();
  };

  handleSubmit = async (trip) => {
    await this.setState({ trip: [...this.state.trip, trip] });
    this.saveData();
  };

  render() {
    const { trip, modal, locationMap, tripToEdit } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol middle size="2">
            <figure class="figure">
              <img
                src="/icons/logo.png"
                alt="Logo"
                classname="figure-img img-fluid z-depth-1"
                style={{ width: '150px' }}
              />
            </figure>
          </MDBCol>
          <MDBCol middle size="10">
            <Form locationMap={locationMap} handleSubmit={this.handleSubmit} />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol middle size="8">
            <h2 class="title is-2 has-text-centered">My Travel Map</h2>
            <Map trip={trip} addLocationMap={this.addLocationMap} />
          </MDBCol>
          <MDBCol middle size="0">
            <Modal
              modal={modal}
              toggle={this.toggle}
              tripToEdit={tripToEdit}
              handleChange={this.handleChange}
              onFormSubmit={this.onFormSubmit}
            />
          </MDBCol>
          <MDBCol middle size="3">
            <h2 class="title is-2 has-text-centered">My Planning</h2>
            <Planning tripData={trip} removeTrip={this.removeTrip} toggle={this.toggle} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default App;
