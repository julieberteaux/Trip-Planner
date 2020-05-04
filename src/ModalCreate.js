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

class ModalCreate extends Component {
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
    const { modalCreate, closeModalCreate } = this.props;
    const { location, startDate, endDate } = this.state;

    return (
      <MDBContainer>
        <MDBModal isOpen={modalCreate} toogle={closeModalCreate} centered>
          <MDBModalHeader toggle={closeModalCreate}>Add a new trip</MDBModalHeader>
          <form onSubmit={this.onFormSubmit}>
            <MDBModalBody>
              <MDBRow>
                <MDBCol>
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
              </MDBRow>
              <MDBRow>
                <MDBCol>
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
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn gradient="peach" onClick={closeModalCreate}>
                Cancel
              </MDBBtn>
              <MDBBtn type="submit" gradient="aqua">
                Add Trip
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalCreate;
