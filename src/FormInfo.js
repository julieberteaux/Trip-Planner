import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class FormInfo extends Component {
  state = {};
  render() {
    const { tripToEdit, handleChange, handleDateChange, onFormSubmit } = this.props;

    return (
      <MDBContainer>
        <form onSubmit={onFormSubmit}>
          <MDBRow>
            <MDBCol>
              <MDBInput
                icon="globe-americas"
                label="Destination"
                type="text"
                name="location"
                id="location"
                value={tripToEdit.location}
                onChange={handleChange}
              />
            </MDBCol>
            <MDBCol>
              <DateRangePicker
                startDate={tripToEdit.startDate} // momentPropTypes.momentObj or null,
                startDateId="startDate" // PropTypes.string.isRequired,
                required
                displayFormat="YYYY-MM-DD"
                endDate={tripToEdit.endDate} // momentPropTypes.momentObj or null,
                endDateId="endDate" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => handleDateChange(startDate, endDate)} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
            </MDBCol>
          </MDBRow>
          <MDBBtn type="submit" gradient="aqua">
            Save changes
          </MDBBtn>
        </form>
      </MDBContainer>
    );
  }
}

export default FormInfo;
