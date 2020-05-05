import React, { Component } from 'react';
import Modal from './Modal';
import Map from './Map';
import LightboxTrip from './LightboxTrip';
import moment from 'moment';
import { MDBContainer, MDBCol, MDBRow, MDBIcon, MDBNavbar, MDBCollapse, MDBNavbarNav } from 'mdbreact';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './style.css';
import 'react-dates/lib/css/_datepicker.css';
import ModalCreate from './ModalCreate';

const SERVER_URL = 'https://julie-trip-planner.herokuapp.com';

class App extends Component {
  state = {
    modal: false,
    modalCreate: false,
    tripToEdit: {},
    locationMap: '',
    accessToken: '',
    userId: '',
    logOut: false,
    infoPage: false,
    infoId: '',
    newTrip: false,
  };

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    await this.setState({ accessToken });
    const userId = localStorage.getItem('userId');
    await this.setState({ userId });
    if (accessToken != null && userId != null) {
      this.setState({ logOut: false });
    } else {
      this.setState({ logOut: true });
    }
    this.getTripData();
  }

  getTripData = async () => {
    try {
      //'&user.id=' + this.state.userId
      const response = await fetch(SERVER_URL + '/trips?access_token=' + this.state.accessToken, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
      const trip = await response.json();
      const newTrips = trip.map((a) => ({
        id: a.id,
        location: a.name,
        notes: a.notes,
        images: a.images,
        startDate: moment(a.start_date),
        endDate: moment(a.end_date),
      }));
      this.setState({ trip: newTrips });
    } catch (e) {
      console.log(e);
      this.setState({ networkError: true });
    }
  };

  getOneTrip = async (id) => {
    try {
      const response = await fetch(SERVER_URL + '/trips/' + id + '?access_token=' + this.state.accessToken, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
      const trip = await response.json();
      const tripToEdit = {
        id: trip.id,
        location: trip.name,
        startDate: moment(trip.start_date),
        endDate: moment(trip.end_date),
        notes: trip.notes,
        images: trip.images,
      };
      this.setState({ tripToEdit: tripToEdit });
    } catch (e) {
      console.log(e);
      this.setState({ networkError: true });
    }
  };

  // change state of the modal
  openModalEdit = (id) => {
    this.getOneTrip(id);
    this.setState({
      modal: true,
    });
  };

  openModalCreate = () => {
    this.setState({
      modalCreate: true,
    });
  };

  closeModalEdit = () => {
    this.setState({
      modal: false,
    });
  };

  closeModalCreate = () => {
    this.setState({
      modalCreate: false,
    });
  };

  logOut = () => {
    this.setState({ logOut: true });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  };

  getInfo = (id) => {
    localStorage.setItem('infoId', id);
    this.setState({ infoId: id });
    this.setState({ infoPage: true });
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

  handleDateChange = (startDate, endDate) => {
    const { tripToEdit } = this.state;
    tripToEdit.startDate = startDate;
    tripToEdit.endDate = endDate;
    this.setState({
      tripToEdit,
    });
  };

  // submit change from the modal
  /* if we don't put an async method, the function might start setState and call saveData before finishing the setState part.
    To avoid this we put async (arguments) in the header of the function and await before the part we need to finish before going further */
  onFormSubmit = async (event) => {
    event.preventDefault();
    const { tripToEdit } = this.state;
    const notes = tripToEdit.notes;
    const name = tripToEdit.location;
    const start_date = tripToEdit.startDate;
    const end_date = tripToEdit.endDate;
    const images = tripToEdit.images;
    const id = tripToEdit.id;
    this.setState({ modal: false });
    try {
      await fetch(SERVER_URL + '/trips/' + id + '?access_token=' + this.state.accessToken, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          start_date,
          end_date,
          notes,
          images,
        }),
      });
      await this.getTripData();
      this.addTripStateTrue();
    } catch (e) {
      console.log(e);
    }
  };

  // remove trip from the state based on its id
  removeTrip = async (id) => {
    try {
      await fetch(SERVER_URL + '/trips/' + id + '?access_token=' + this.state.accessToken, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
        },
      });
      await this.getTripData();
      this.addTripStateTrue();
    } catch (e) {
      console.log(e);
    }
  };

  // create trip
  handleSubmit = async (trip) => {
    const name = trip.location;
    const start_date = trip.startDate;
    const end_date = trip.endDate;
    this.setState({ modalCreate: false });
    try {
      await fetch(SERVER_URL + '/trips?access_token=' + this.state.accessToken, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          start_date,
          end_date,
        }),
      });
      await this.getTripData();
      this.addTripStateTrue();
    } catch (e) {
      console.log(e);
    }
  };

  addTripStateTrue = () => {
    this.setState({ newTrip: true });
    console.log('trip true');
  };

  addTripStateFalse = () => {
    this.setState({ newTrip: false });
  };

  render() {
    if (this.state.logOut) {
      return <Redirect to={`/login`}></Redirect>;
    }
    if (this.state.infoPage) {
      return <Redirect push to={`/info`}></Redirect>;
    }
    const { trip, modal, modalCreate, locationMap, tripToEdit, newTrip } = this.state;
    const bgEntete = { backgroundColor: '#F5F5F5' };
    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBNavbar style={bgEntete} expand="xs" scrolling fixed="top">
            <MDBCollapse isOpen={true} navbar>
              <MDBNavbarNav left>
                <img
                  src="/icons/logo.png"
                  alt="Logo"
                  classname="figure-img img-fluid z-depth-1"
                  style={{ width: '60px' }}
                />
              </MDBNavbarNav>
              <p className="title">My Trip Planner</p>
              <MDBNavbarNav right>
                <button onClick={this.logOut} className="unstyled-button">
                  <MDBIcon icon="sign-out-alt" size="lg" />
                </button>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </MDBRow>

        <Modal
          modal={modal}
          closeModalEdit={this.closeModalEdit}
          tripToEdit={tripToEdit}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          onFormSubmit={this.onFormSubmit}
        />

        <ModalCreate
          modalCreate={modalCreate}
          closeModalCreate={this.closeModalCreate}
          locationMap={locationMap}
          handleSubmit={this.handleSubmit}
        />

        <MDBRow style={{ paddingTop: '85px' }}>
          <MDBCol size="6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
            <Map trip={trip} addLocationMap={this.addLocationMap} />
          </MDBCol>

          <MDBCol size="6" style={{ paddingTop: '10px' }}>
            {trip ? (
              <LightboxTrip
                tripData={trip}
                newTrip={newTrip}
                addTripStateFalse={this.addTripStateFalse}
                removeTrip={this.removeTrip}
                openModalEdit={this.openModalEdit}
                openModalCreate={this.openModalCreate}
                getInfo={this.getInfo}
              />
            ) : null}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default App;
