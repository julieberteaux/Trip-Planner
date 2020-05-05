import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask, MDBIcon } from 'mdbreact';
import Lightbox from 'react-image-lightbox';
import './lightbox.css';
import './scrollbar.css';

class LightboxPage extends React.Component {
  state = {
    photoIndex: 0,
    isOpen: false,
    images: [],
  };

  componentDidMount() {
    const images = this.props.tripToEdit.images;
    this.setState({ images: images });
  }

  componentDidUpdate(prevProps) {
    const images = this.props.tripToEdit.images;
    if (prevProps.newPic !== this.props.newPic) {
      this.setState({ images: images });
    }
  }

  renderImages = () => {
    let photoIndex = -1;
    const { images } = this.state;
    if (this.props.newPic) {
      this.props.addPicStateFalse();
    }

    return images.map((imageSrc) => {
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol md="4" key={photoIndex} style={{ paddingLeft: '3px', paddingRight: '3px' }}>
          <figure>
            <MDBView hover>
              <img
                src={imageSrc}
                alt="Gallery"
                className="img-fluid"
                onClick={() => this.setState({ photoIndex: privateKey, isOpen: true })}
              />

              <MDBMask className="flex-center" overlay="stylish-strong">
                <MDBContainer fluid>
                  <MDBRow around style={{ paddingTop: '35px', paddingLeft: '4px', paddingRight: '4px' }}>
                    <button
                      onClick={() => this.setState({ photoIndex: privateKey, isOpen: true })}
                      className="unstyled-button"
                    >
                      <MDBIcon icon="expand" size="lg" className="white-text" />
                    </button>

                    <button onClick={() => this.props.deleteImage(imageSrc)} className="unstyled-button">
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
    const { photoIndex, isOpen, images } = this.state;
    //
    const scrollContainerStyle = { maxWidth: '750px', maxHeight: '600px' };
    return (
      <MDBContainer fluid>
        <div className="scrollbar mt-3 mx-auto thin" style={scrollContainerStyle}>
          <div className="mdb-lightbox no-margin">
            <MDBRow>{this.renderImages()}</MDBRow>
          </div>
        </div>
        {isOpen && (
          <MDBRow style={{ paddingTop: '85px' }}>
            <Lightbox
              color="rgba-white-strong"
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              imageTitle={photoIndex + 1 + '/' + images.length}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          </MDBRow>
        )}
      </MDBContainer>
    );
  }
}

export default LightboxPage;
