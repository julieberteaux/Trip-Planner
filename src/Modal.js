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

class Modal extends Component {
  render() {
    const { tripToEdit, handleChange, modal, toggle, onFormSubmit } = this.props;

    return (
      <MDBContainer>
        <MDBModal isOpen={modal} toggle={toggle} centered>
          <MDBModalHeader toggle={toggle}>Edit YOUUUUR trip</MDBModalHeader>
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
                  <MDBInput
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
                    onChange={this.handleChange}
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn gradient="peach" onClick={toggle}>
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

/*

const ModalPage = (props) => {
    const { modal, toggle, tripToEdit} = props;

    this.state = {
        trip_location: {tripToEdit.location},
        trip_startDate: {tripToEdit.startDate},
        trip_endDate: {tripToEdit.endDate},
      }

        return (
            <MDBContainer>
                <MDBModal isOpen={modal} toggle={toggle}>
                    <MDBModalHeader toggle={toggle}>Edit your trip</MDBModalHeader>
                    <MDBModalBody>
                    <form>
                        <div className={`form-group ${styles.formGroup} ${styles.projName}`}>
                            <label htmlFor="trip-location" className="col-form-label">Location</label>
                            <input type="text" className="form-control" id="trip-location" 
                                name="trip_location" 
                                value={this.state.trip_location}
                                onChange={this.onlocationChange.bind(this)} />
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <label htmlFor="description" className="col-form-label">Description</label>
                            <textarea className="form-control" id="description" 
                                    rows="4" name="description" 
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange.bind(this)}></textarea>
                        </div>
                    </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn gradient="peach" onClick={toggle}>Close</MDBBtn>
                        <MDBBtn gradient="aqua">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
}

export default ModalPage;*/
