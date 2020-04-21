import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
import { Redirect } from 'react-router-dom';

class Register extends React.Component {
  state = {
    userName: '',
    displayErrorUser: false,
    password1: '',
    displayErrorPassword1: false,
    password2: '',
    displayErrorPassword2: false,
    registerValid: false,
  };

  getClientData = (value, type) =>
    this.setState({
      [type]: value,
    });

  onFormSubmit = (e) => {
    e.preventDefault();
    const { userName, password1, password2 } = this.state;
    if (userName.length > 0) {
      if (password1.length > 0) {
        if (password1 === password2) {
          this.setState({ registerValid: true });
        } else {
          this.setState({ displayErrorPassword2: true });
        }
      } else {
        this.setState({ displayErrorPassword1: true });
      }
    } else {
      this.setState({ displayErrorUser: true });
    }
  };

  render() {
    if (this.state.registerValid) {
      return <Redirect push to={`/userName/${this.state.userName}`}></Redirect>;
    }

    return (
      <MDBContainer>
        <MDBRow middle>
          <MDBCol md="6" className="offset-md-3 mt-5">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onFormSubmit}>
                  <p className="h4 text-center py-4">Sign In</p>
                  {this.state.displayErrorUser && (
                    <MDBAlert color="danger" dismiss>
                      your <strong>email</strong> is empty
                    </MDBAlert>
                  )}
                  {this.state.displayErrorPassword1 && (
                    <MDBAlert color="danger" dismiss>
                      your <strong>password</strong> is empty
                    </MDBAlert>
                  )}
                  {this.state.displayErrorPassword2 && (
                    <MDBAlert color="danger" dismiss>
                      you entered two differents <strong>passwords</strong>
                    </MDBAlert>
                  )}
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      type="text"
                      getValue={(value) => this.getClientData(value, 'userName')}
                    />
                    <MDBInput
                      label="Create your password"
                      icon="lock"
                      type="password"
                      getValue={(value) => this.getClientData(value, 'password1')}
                    />
                    <MDBInput
                      label="Type your password again"
                      icon="lock"
                      type="password"
                      getValue={(value) => this.getClientData(value, 'password2')}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn gradient="aqua" type="submit" onClick={this.onFormSubmit}>
                      Register
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Register;
