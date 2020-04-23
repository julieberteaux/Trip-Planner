import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
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

  render() {
    if (this.state.registerValid) {
      return <Redirect push to={`/user/${this.state.email}`}></Redirect>;
    }

    return (
      <div className="bg">
        <MDBContainer>
          <MDBRow middle>
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
      </div>
    );
  }
}

export default Register;
