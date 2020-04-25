import React, { Component } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdbreact';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      location: '',
      startDate: null,
      endDate: null,
    };

    this.state = this.initialState;
  }

  render() {
    const { tripToEdit, handleChange, handleDateChange, modal, closeModalEdit, onFormSubmit } = this.props;

    return (
      <MDBContainer>
        <MDBModal isOpen={modal} toogle={closeModalEdit} centered>
          <MDBModalHeader toggle={closeModalEdit}>Edit your trip</MDBModalHeader>
          <form onSubmit={onFormSubmit}>
            <MDBModalBody>
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
              </MDBRow>
              <MDBRow>
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
                  {/* <MDBInput
                    icon="calendar-alt"
                    label="Start"
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={tripToEdit.startDate}
                    onChange={handleChange}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    icon="calendar-alt"
                    label="End"
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={tripToEdit.endDate}
                    onChange={handleChange}
                  />*/}
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn gradient="peach" onClick={closeModalEdit}>
                Close
              </MDBBtn>
              <MDBBtn type="submit" gradient="aqua">
                Save changes
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default Modal;
