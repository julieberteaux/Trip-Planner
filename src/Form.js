import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBContainer } from 'mdbreact';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

class Form extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      location: '',
      startDate: null,
      endDate: null,
    };

    this.state = this.initialState;
  }

  falseFunc = () => false;

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

  render() {
    const { location, startDate, endDate } = this.state;

    return (
      <MDBContainer fluid>
        <form onSubmit={this.onFormSubmit}>
          <MDBRow center>
            <MDBCol size="6" middle>
              <MDBInput
                background
                icon="globe-americas"
                label="Choose your next destination"
                type="text"
                name="location"
                id="location"
                required
                value={location}
                onChange={this.handleChange}
              />
            </MDBCol>
            <MDBCol size="4" middle>
              <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                required
                displayFormat="YYYY-MM-DD"
                isOutsideRange={this.falseFunc}
                startDateId="startDate" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="endDate" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </MDBCol>
            <MDBCol size="2" middle>
              <div class="float-center">
                <MDBBtn gradient="blue" type="submit">
                  Add
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>

      /* <MDBCol md="3">
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
          </MDBCol> */
    );
  }
}

export default Form;
