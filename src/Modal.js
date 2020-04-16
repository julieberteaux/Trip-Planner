import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Modal extends Component {
  render() {
    const { tripToEdit, handleChange, modal, toggle, onFormSubmit } = this.props;

    return (
      <MDBContainer>
        <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Edit YOUUUUR trip</MDBModalHeader>
          <form onSubmit={onFormSubmit}>
            <MDBModalBody>
              <div class="columns is-vcentered">
                <div class="column is-4">
                  <div class="field">
                    <label class="label">Destination</label>
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        name="location"
                        id="location"
                        value={tripToEdit.location}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
                <div class="column is-3">
                  <div class="field">
                    <label class="label">Start</label>
                    <div class="control">
                      <input
                        class="input"
                        type="date"
                        name="startDate"
                        id="startDate"
                        value={tripToEdit.startDate}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
                <div class="column is-3">
                  <div class="field">
                    <label class="label">End</label>
                    <div class="control">
                      <input
                        class="input"
                        type="date"
                        name="endDate"
                        id="endDate"
                        value={tripToEdit.endDate}
                        onChange={handleChange}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn gradient="peach" onClick={toggle}>
                Close
              </MDBBtn>
              <div class="control">
                <MDBBtn type="submit" gradient="aqua" class="button is-link">
                  Save changes
                </MDBBtn>
              </div>
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
