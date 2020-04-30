import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdbreact';
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
        <MDBCol md="4" key={photoIndex}>
          <figure>
            <img
              src={imageSrc}
              alt="Gallery"
              className="img-fluid"
              onClick={() => this.setState({ photoIndex: privateKey, isOpen: true })}
            />
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
        <div className="scrollbar scrollbar-deep-blue mt-3 mx-auto thin" style={scrollContainerStyle}>
          <div className="mdb-lightbox no-margin">
            <MDBRow>{this.renderImages()}</MDBRow>
          </div>
        </div>
        {isOpen && (
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
        )}
      </MDBContainer>
    );
  }
}

export default LightboxPage;
