import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert, MDBIcon } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import FormInfo from './FormInfo';
import Notes from './Notes';
import LightboxPage from './Lightbox';
import moment from 'moment';
import UploadImage from './UploadImage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import 'react-dates/lib/css/_datepicker.css';

const SERVER_URL = 'https://julie-trip-planner.herokuapp.com';

class Info extends React.Component {
  state = {
    infoId: '',
    accessToken: '',
    mainPage: false,
    userId: '',
    displaySuccess: false,
    newPic: false,
  };

  async componentDidMount() {
    const accessToken = localStorage.getItem('accessToken');
    await this.setState({ accessToken });
    const userId = localStorage.getItem('userId');
    await this.setState({ userId });
    const infoId = localStorage.getItem('infoId');
    await this.setState({ infoId });
    this.getOneTrip(this.state.infoId);
  }

  getOneTrip = async (id) => {
    try {
      const response = await fetch(SERVER_URL + '/trips/' + id + '?access_token=' + this.state.accessToken, {
        method: 'get',
        headers: {
          Accept: 'application/json',
        },
      });
      const trip = await response.json();
      if (trip.notes !== undefined) {
        trip.notes = JSON.parse(trip.notes);
        console.log('getNotes');
      } else {
        trip.notes = trip.notes;
      }
      const tripToEdit = {
        id: trip.id,
        location: trip.name,
        notes: trip.notes,
        images: trip.images,
        startDate: moment(trip.start_date),
        endDate: moment(trip.end_date),
      };
      console.log(tripToEdit);
      this.setState({ tripToEdit });
    } catch (e) {
      console.log(e);
      this.setState({ networkError: true });
    }
  };

  exitInfo = () => {
    this.setState({ mainPage: true });
  };

  handleDateChange = (startDate, endDate) => {
    const { tripToEdit } = this.state;
    tripToEdit.startDate = startDate;
    tripToEdit.endDate = endDate;
    this.setState({
      tripToEdit,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    const { tripToEdit } = this.state;
    tripToEdit[name] = value;
    this.setState({
      tripToEdit,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    this.setState({ displaySuccess: false });
    const { tripToEdit } = this.state;
    const name = tripToEdit.location;
    const start_date = tripToEdit.startDate;
    const end_date = tripToEdit.endDate;
    const id = tripToEdit.id;
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
      this.setState({ displaySuccess: true });
    } catch (e) {
      console.log(e);
    }
  };

  updateTripNotes = async (content) => {
    const { tripToEdit } = this.state;
    tripToEdit.notes = content;
    this.setState({
      tripToEdit,
    });

    const notes = tripToEdit.notes;
    const name = tripToEdit.location;
    const start_date = tripToEdit.startDate;
    const end_date = tripToEdit.endDate;
    const images = tripToEdit.images;
    const id = tripToEdit.id;
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
      console.log('apres fetch');
    } catch (e) {
      console.log(e);
    }
  };

  updateTripImages = async (url) => {
    const { tripToEdit } = this.state;
    //this.setState({ trip: [...this.state.trip, trip] });
    tripToEdit.images = [...tripToEdit.images, url];
    this.setState({
      tripToEdit,
    });
    const notes = tripToEdit.notes;
    const name = tripToEdit.location;
    const start_date = tripToEdit.startDate;
    const end_date = tripToEdit.endDate;
    const images = tripToEdit.images;
    const id = tripToEdit.id;
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
      this.addPicStateTrue();
    } catch (e) {
      console.log(e);
    }
  };

  addPicStateTrue = () => {
    this.setState({ newPic: true });
  };

  addPicStateFalse = () => {
    this.setState({ newPic: false });
  };

  render() {
    const { tripToEdit, newPic } = this.state;
    if (this.state.mainPage) {
      return <Redirect push to={`/`}></Redirect>;
    }
    return (
      <div className="bg">
        <MDBContainer fluid>
          <MDBRow end>
            {this.state.displaySuccess && (
              <MDBAlert dismiss color="success">
                Congrats, your trip has been updated !
              </MDBAlert>
            )}
          </MDBRow>
          <MDBRow middle>
            <MDBCol size="10">
              {tripToEdit ? (
                <FormInfo
                  tripToEdit={tripToEdit}
                  handleDateChange={this.handleDateChange}
                  handleChange={this.handleChange}
                  onFormSubmit={this.onFormSubmit}
                />
              ) : null}
            </MDBCol>
            <MDBCol middle size="2">
              <MDBBtn rounded outline color="primary" tag="a" onClick={() => this.exitInfo()}>
                <MDBIcon icon="chevron-circle-left" className="mr-1" /> Return
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow middle>
            <MDBCol size="6">
              <MDBRow>
                <UploadImage updateTripImages={this.updateTripImages} />
              </MDBRow>
              <MDBRow>
                {tripToEdit ? (
                  <LightboxPage tripToEdit={tripToEdit} newPic={newPic} addPicStateFalse={this.addPicStateFalse} />
                ) : null}
              </MDBRow>
            </MDBCol>
            <MDBCol size="6">
              {tripToEdit ? <Notes tripToEdit={tripToEdit} updateTripNotes={this.updateTripNotes} /> : null}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Info;
