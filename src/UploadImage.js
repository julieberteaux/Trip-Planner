import React from 'react';
import Dropzone from 'react-dropzone';
import { MDBContainer, MDBCard, MDBCardBody } from 'mdbreact';
import LightboxPage from './Lightbox';

const CLOUDINARY_UPLOAD_PRESET = 'ktbt9osv';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/julieb/upload';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0],
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    fetch(CLOUDINARY_UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          this.setState({
            uploadedFileCloudinaryUrl: data.secure_url,
          });
          this.props.updateTripImages(this.state.uploadedFileCloudinaryUrl);
        }
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <MDBContainer fluid style={{ paddingLeft: '0px', paddingRight: '0px' }}>
        <MDBCard>
          <MDBCardBody>
            <form>
              <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                multiple={false}
                accept="image/*"
                styles={{ dropzone: { minHeight: 50 } }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="h5 grey-text text-center py-2">
                        Drag and drop an image, or click anywhere to select one from your computer
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </form>
            {this.props.tripToEdit ? (
              <LightboxPage
                tripToEdit={this.props.tripToEdit}
                newPic={this.props.newPic}
                addPicStateFalse={this.props.addPicStateFalse}
                deleteImage={this.props.deleteImage}
              />
            ) : null}
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
export default UploadImage;
