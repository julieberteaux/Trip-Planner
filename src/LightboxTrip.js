import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBMask, MDBView, MDBIcon } from 'mdbreact';
import moment from 'moment';
import './scrollbar.css';

class LightboxTrip extends React.Component {
  state = {
    tripIndex: 0,
    isOpen: false,
    trips: [],
    default: ['https://res.cloudinary.com/julieb/image/upload/v1588602107/Trip-Planner/dlirycrxa0rardrclvsp.jpg'],
  };

  componentDidMount() {
    const trips = this.props.tripData;
    this.setState({ trips: trips });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newTrip !== this.props.newTrip) {
      const trips = this.props.tripData;
      this.setState({ trips: trips });
    }
  }

  renderImages = () => {
    let tripIndex = -1;
    const { trips } = this.state;
    if (this.props.newTrip) {
      this.props.addTripStateFalse();
    }

    return trips.map((tripSrc) => {
      tripIndex++;
      const privateKey = tripIndex;
      let image = this.state.default[0];

      if (tripSrc.images[0] !== undefined) {
        image = tripSrc.images[0];
      }

      return (
        <MDBCol md="4" key={tripIndex} style={{ paddingLeft: '3px', paddingRight: '3px' }}>
          <figure>
            <MDBView hover>
              <img
                src={image}
                alt="Gallery"
                className="img-fluid"
                onClick={() => this.setState({ tripIndex: privateKey, isOpen: true })}
              />

              <MDBMask className="flex-center" overlay="stylish-strong">
                <MDBContainer fluid>
                  <p className="tripCity">{tripSrc.location}</p>
                  <p className="tripDate">
                    {moment(tripSrc.startDate).format('YYYY-MM-DD')} / {moment(tripSrc.endDate).format('YYYY-MM-DD')}
                  </p>
                  <MDBRow around style={{ paddingTop: '35px', paddingLeft: '4px', paddingRight: '4px' }}>
                    <button onClick={() => this.props.openModalEdit(tripSrc.id)} className="unstyled-button">
                      <MDBIcon icon="pen" size="lg" className="white-text" />
                    </button>

                    <button onClick={() => this.props.getInfo(tripSrc.id)} className="unstyled-button">
                      <MDBIcon icon="info" size="lg" className="white-text" />
                    </button>

                    <button onClick={() => this.props.removeTrip(tripSrc.id)} className="unstyled-button">
                      <MDBIcon icon="trash" size="lg" className="white-text" />
                    </button>
                  </MDBRow>
                </MDBContainer>
              </MDBMask>
            </MDBView>
          </figure>
        </MDBCol>
      );
    });
  };

  render() {
    const { tripIndex } = this.state;
    const scrollContainerStyle = { maxWidth: '750px', maxHeight: '600px' };
    return (
      <MDBContainer fluid>
        <div className="scrollbar mt-3 mx-auto thin" style={scrollContainerStyle}>
          <div className="mdb-lightbox no-margin">
            <MDBRow>
              {this.renderImages()}
              <MDBCol md="4" middle key={tripIndex} style={{ paddingLeft: '3px', paddingRight: '3px' }}>
                <button onClick={() => this.props.openModalCreate()} className="unstyled-button mx-4">
                  <p>
                    <MDBIcon icon="plus" size="5x" className="grey-text mx-xl-5" />
                  </p>
                </button>
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </MDBContainer>
    );
  }
}

export default LightboxTrip;
