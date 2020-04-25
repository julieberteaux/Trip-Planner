import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert, MDBIcon } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import FormInfo from './FormInfo';
import moment from 'moment';

const SERVER_URL = 'https://julie-trip-planner.herokuapp.com';

class Info extends React.Component {
  state = {
    infoId: '',
    tripToEdit: {},
    accessToken: '',
    mainPage: false,
    userId: '',
    displaySuccess: false,
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
      const tripToEdit = {
        id: trip.id,
        location: trip.name,
        startDate: moment(trip.start_date),
        endDate: moment(trip.end_date),
      };
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

  render() {
    const { tripToEdit, userId } = this.state;
    if (this.state.mainPage) {
      return <Redirect push to={`/`}></Redirect>;
    }
    return (
      <MDBContainer fluid>
        <MDBRow>
          {this.state.displaySuccess && (
            <MDBAlert dismiss color="success">
              Congrats, your trip has been updated !
            </MDBAlert>
          )}
          <MDBCol size="10">
            <FormInfo
              tripToEdit={tripToEdit}
              handleDateChange={this.handleDateChange}
              handleChange={this.handleChange}
              onFormSubmit={this.onFormSubmit}
            />
          </MDBCol>
          <MDBCol size="2">
            <MDBBtn rounded outline color="primary" tag="a" onClick={() => this.exitInfo()}>
              <MDBIcon icon="chevron-circle-left" className="mr-1" /> Return
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Info;
