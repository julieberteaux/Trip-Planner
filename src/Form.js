import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      location: '',
      startDate: '',
      endDate: '',
    };

    this.state = this.initialState;
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.locationMap !== this.props.locationMap) {
      const { locationMap } = this.props;
      this.setState({
        location: locationMap,
      });
    }
  }
  // componentDidMount() {
  //   const { locationMap, removeLocationMap } = this.props;
  //   this.setState({
  //     location: locationMap,
  //   });
  //   removeLocationMap();
  // }

  render() {
    const { location, startDate, endDate } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <MDBRow>
          <MDBCol md="4">
            <MDBInput
              icon="globe-americas"
              label="Choose your next destination"
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={this.handleChange}
            />
          </MDBCol>
          <MDBCol md="3">
            <MDBInput
              icon="calendar-alt"
              label="beginning of your trip"
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={this.handleChange}
            />
          </MDBCol>
          <MDBCol md="3">
            <MDBInput
              icon="calendar-alt"
              label="end of your trip"
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={this.handleChange}
            />
          </MDBCol>
          <MDBCol md="2">
            <MDBBtn gradient="blue" type="submit">
              Add your new trip
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
    );
  }
}

export default Form;
