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
    const { tripToEdit, handleChange, modal, closeModalEdit, onFormSubmit } = this.props;

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
                    onChange={handleChange}
                  />
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
