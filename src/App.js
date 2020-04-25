import React, { Component } from 'react';
import Planning from './Planning';
import Form from './Form';
import Modal from './Modal';
import Map from './Map';
import moment from 'moment';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBNavbar,
  MDBCollapse,
  MDBNavbarNav,
  MDBTypography,
} from 'mdbreact';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import './style.css';
import 'react-dates/lib/css/_datepicker.css';

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
    infoPage: false,
    infoId: '',
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

  closeModalEdit = () => {
    this.setState({
      modal: false,
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
      return <Redirect to={`/login`}></Redirect>;
    }
    if (this.state.infoPage) {
      return <Redirect push to={`/info`}></Redirect>;
    }
    const { trip, modal, locationMap, tripToEdit } = this.state;
    const bgPink = { backgroundColor: '#e0f7fa' };
    return (
      //   <div>
      //     <header>
      //       <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
      //         <MDBCollapse isOpen={true} navbar>
      //           <MDBNavbarNav left>
      //             <img src="/icons/favicon-96x96.png" alt="Logo" classname="img-fluid" />
      //           </MDBNavbarNav>
      //           <Form locationMap={locationMap} handleSubmit={this.handleSubmit} />
      //           <MDBNavbarNav right>
      //             <MDBTooltip placement="bottom">
      //               <MDBBtn gradient="peach" tag="a" onClick={() => this.logOut()}>
      //                 <MDBIcon icon="sign-out-alt" />
      //               </MDBBtn>
      //               Log Out
      //             </MDBTooltip>
      //           </MDBNavbarNav>
      //         </MDBCollapse>
      //       </MDBNavbar>
      //     </header>
      //     <MDBContainer fluid>
      //       <MDBRow >
      //         <MDBCol size="4">
      //           <Planning tripData={trip} removeTrip={this.removeTrip} openModalEdit={this.openModalEdit} />
      //         </MDBCol>
      //         <MDBCol size="8">
      //           <Map trip={trip} addLocationMap={this.addLocationMap} />
      //         </MDBCol>
      //       </MDBRow>
      //     </MDBContainer>
      //   </div>

      <div className="bg">
        <MDBContainer fluid>
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
            <MDBCol size="6">
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
                handleDateChange={this.handleDateChange}
                onFormSubmit={this.onFormSubmit}
              />
            </MDBCol>

            <MDBCol size="5">
              <MDBTypography colorText="mdb-color" className="text-center" tag="h2">
                My Planning
              </MDBTypography>
              <Planning
                tripData={trip}
                removeTrip={this.removeTrip}
                openModalEdit={this.openModalEdit}
                getInfo={this.getInfo}
              />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default App;
