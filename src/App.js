import React, { Component } from 'react';
import Planning from './Planning';
import Form from './Form';
import Modal from './Modal';
import Map from './Map';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBTypography } from 'mdbreact';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './style.css';

const SERVER_URL = 'https://julie-trip-planner.herokuapp.com';

class App extends Component {
  state = {
    trip: [],
    modal: false,
    tripToEdit: {},
    locationMap: '',
    accessToken: '',
    userId: '',
    logOut: false,
  };

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    await this.setState({ accessToken });
    const userId = localStorage.getItem('userId');
    await this.setState({ userId });
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
        startDate: a.start_date,
        endDate: a.end_date,
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
        startDate: trip.start_date,
        endDate: trip.end_date,
      };
      this.setState({ tripToEdit: tripToEdit });
    } catch (e) {
      console.log(e);
      this.setState({ networkError: true });
    }
  };

  //   saveData = () => {
  //     console.log('MIS A JOUR');
  //     const { trip } = this.state;
  //     localStorage.setItem('trip', JSON.stringify(trip));
  //   };

  // change state of the modal
  openModalEdit = (id) => {
    this.getOneTrip(id);
    this.setState({
      modal: true,
    });
  };

  closeModalEdit = () => {
    this.setState({
      modal: false,
    });
  };

  logOut = () => {
    this.setState({ logOut: true });
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
    const { tripToEdit } = this.state;
    const name = tripToEdit.location;
    const start_date = tripToEdit.startDate;
    const end_date = tripToEdit.endDate;
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
        }),
      });
      this.getTripData();
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
      this.getTripData();
    } catch (e) {
      console.log(e);
    }
  };

  // create trip
  handleSubmit = async (trip) => {
    const name = trip.location;
    const start_date = trip.startDate;
    const end_date = trip.endDate;
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
      this.getTripData();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (this.state.logOut) {
      return <Redirect to={`/`}></Redirect>;
    }
    const { trip, modal, locationMap, tripToEdit } = this.state;
    return (
      <div className="bg">
        <MDBContainer>
          <div className="bg"></div>
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
              <MDBRow>
                <MDBCol middle size="10">
                  <MDBTypography colorText="mdb-color" className="text-center" tag="h2">
                    <strong>My Trip Planner</strong>
                  </MDBTypography>
                </MDBCol>
                <MDBCol size="2">
                  <MDBBtn rounded outline color="primary" tag="a" onClick={() => this.logOut()}>
                    <MDBIcon icon="sign-out-alt" className="mr-1" /> Exit
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol left size="12">
                  <Form locationMap={locationMap} handleSubmit={this.handleSubmit} />
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol size="7">
              <MDBTypography colorText="mdb-color" className="text-center" tag="h2">
                My Travel Map
              </MDBTypography>

              <Map trip={trip} addLocationMap={this.addLocationMap} />
            </MDBCol>

            <MDBCol size="0">
              <Modal
                modal={modal}
                closeModalEdit={this.closeModalEdit}
                tripToEdit={tripToEdit}
                handleChange={this.handleChange}
                onFormSubmit={this.onFormSubmit}
              />
            </MDBCol>

            <MDBCol size="4">
              <MDBTypography colorText="mdb-color" className="text-center" tag="h2">
                My Planning
              </MDBTypography>
              <Planning tripData={trip} removeTrip={this.removeTrip} openModalEdit={this.openModalEdit} />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default App;
