import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class FormInfo extends Component {
  state = {};

  falseFunc = () => false;

  render() {
    const { tripToEdit, handleChange, handleDateChange, onFormSubmit } = this.props;

    return (
      <MDBContainer fluid>
        <form onSubmit={onFormSubmit}>
          <MDBRow>
            <MDBCol middle>
              <MDBInput
                background
                icon="globe-americas"
                label="Destination"
                type="text"
                name="location"
                id="location"
                required
                value={tripToEdit.location}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol middle>
              <DateRangePicker
                startDate={tripToEdit.startDate} // momentPropTypes.momentObj or null,
                startDateId="startDate" // PropTypes.string.isRequired,
                required
                isOutsideRange={this.falseFunc}
                displayFormat="YYYY-MM-DD"
                endDate={tripToEdit.endDate} // momentPropTypes.momentObj or null,
                endDateId="endDate" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => handleDateChange(startDate, endDate)} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </MDBCol>
            <MDBCol middle>
              <MDBBtn type="submit" gradient="aqua">
                Save changes
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default FormInfo;
