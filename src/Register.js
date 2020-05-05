import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
  MDBAlert,
  MDBNavbarNav,
  MDBNavbar,
  MDBCollapse,
  MDBIcon,
} from 'mdbreact';
import { Redirect } from 'react-router-dom';

const SERVER_URL = 'https://julie-trip-planner.herokuapp.com';

class Register extends React.Component {
  state = {
    email: '',
    displayErrorEmail: false,
    password1: '',
    displayErrorPassword1: false,
    password2: '',
    displayErrorPassword2: false,
    registerValid: false,
    displayErrorAPI: false,
    userId: '',
    existentClient: false,
  };

  getClientData = (value, type) =>
    this.setState({
      [type]: value,
    });

  signUp = async (email, password) => {
    try {
      const response = await fetch(SERVER_URL + '/users', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const user = await response.json();
      if (user.token.length > 0) {
        localStorage.setItem('accessToken', user.token);
        localStorage.setItem('userId', user.user.id);
        this.setState({ userId: user.user.id });
        this.setState({ registerValid: true });
      } else {
        this.setState({ displayErrorAPI: true });
      }
    } catch (e) {
      this.setState({ displayErrorAPI: true });
      console.log(e);
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password1, password2 } = this.state;

    if (email.length > 0) {
      if (password1.length >= 6) {
        if (password1 === password2) {
          this.signUp(email, password1);
        } else {
          this.setState({ displayErrorPassword2: true });
        }
      } else {
        this.setState({ displayErrorPassword1: true });
      }
    } else {
      this.setState({ displayErrorEmail: true });
    }
  };

  setExistentClient = () =>
    this.setState({
      existentClient: true,
    });

  render() {
    if (this.state.registerValid) {
      return <Redirect push to={`/`}></Redirect>;
    }
    if (this.state.existentClient) {
      return <Redirect push to={`/login`}></Redirect>;
    }
    const bgEntete = { backgroundColor: '#F5F5F5' };
    return (
      <MDBContainer>
        <MDBRow>
          <MDBNavbar style={bgEntete} expand="xs" scrolling fixed="top">
            <MDBCollapse isOpen={true} navbar>
              <MDBNavbarNav left>
                <img
                  src="/icons/logo.png"
                  alt="Logo"
                  classname="figure-img img-fluid z-depth-1"
                  style={{ width: '60px' }}
                />
              </MDBNavbarNav>
              <p className="title">My Trip Planner</p>
              <MDBNavbarNav right>
                <img
                  src="/icons/logo.png"
                  alt="Logo"
                  classname="figure-img img-fluid z-depth-1"
                  style={{ width: '60px' }}
                />
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </MDBRow>
        <MDBRow middle style={{ paddingTop: '85px' }}>
          <MDBCol md="6" className="offset-md-3 mt-5">
            <MDBCard>
              <MDBCardBody>
                <form onSubmit={this.onFormSubmit}>
                  <p className="h4 text-center py-4">Sign In</p>
                  {this.state.displayErrorEmail && (
                    <MDBAlert color="danger" dismiss>
                      Your <strong>email</strong> isn't correct.
                    </MDBAlert>
                  )}
                  {this.state.displayErrorAPI && (
                    <MDBAlert color="danger" dismiss>
                      An error occured please verify your email and try again.
                    </MDBAlert>
                  )}
                  {this.state.displayErrorPassword1 && (
                    <MDBAlert color="danger" dismiss>
                      Your <strong>password</strong> must contain at least 6 caracters.
                    </MDBAlert>
                  )}
                  {this.state.displayErrorPassword2 && (
                    <MDBAlert color="danger" dismiss>
                      You entered two differents <strong>passwords</strong>.
                    </MDBAlert>
                  )}
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      type="text"
                      getValue={(value) => this.getClientData(value, 'email')}
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
                    <button type="submit" onClick={this.onFormSubmit} className="unstyled-button">
                      Register <MDBIcon icon="sign-in-alt" size="lg" />
                    </button>
                  </div>
                </form>
                <div className="text-center py-4 mt-3">
                  <p className="font-small grey-text d-flex justify-content-center">
                    Already have an account?
                    <button onClick={this.setExistentClient} className="unstyled-button">
                      Log in
                    </button>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Register;
