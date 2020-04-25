import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
import { Redirect } from 'react-router-dom';

const SERVER_URL = 'https://julie-trip-planner.herokuapp.com';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginVerified: false,
    newClient: false,
    displayError: false,
    displayErrorAPI: false,
    userId: '',
  };

  logIn = async (email, password) => {
    try {
      const response = await fetch(SERVER_URL + '/auth', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          Authorization: 'Basic ' + btoa(email + ':' + password),
        },
      });
      const user = await response.json();
      if (user.token.length > 0) {
        localStorage.setItem('accessToken', user.token);
        localStorage.setItem('userId', user.user.id);
        this.setState({ userId: user.user.id });
        this.setState({ loginVerified: true });
      } else {
        this.setState({ displayErrorAPI: true });
      }
    } catch (e) {
      console.log(e);
      this.setState({ displayErrorAPI: true });
    }
  };

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });

  setNewClient = () =>
    this.setState({
      newClient: true,
    });

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.logIn(email, password);
  };

  render() {
    if (this.state.loginVerified) {
      return <Redirect push to={`/`}></Redirect>;
    }
    if (this.state.newClient) {
      return <Redirect push to={`/register`}></Redirect>;
    }
    return (
      <div className="bg">
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6" className="offset-md-3 mt-5">
              <MDBCard>
                <MDBCardBody>
                  <form onSubmit={this.onFormSubmit}>
                    <p className="h4 text-center py-4">Log In</p>

                    {this.state.displayError && (
                      <MDBAlert color="danger" dismiss>
                        Wrong <strong>email</strong> or <strong>password</strong>
                      </MDBAlert>
                    )}
                    {this.state.displayErrorAPI && (
                      <MDBAlert color="danger" dismiss>
                        An error occured please verify your email and try again.
                      </MDBAlert>
                    )}

                    <div className="grey-text">
                      <MDBInput
                        label="Type your email"
                        icon="envelope"
                        type="text"
                        getValue={(value) => this.getLoginData(value, 'email')}
                      />
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        type="password"
                        getValue={(value) => this.getLoginData(value, 'password')}
                      />
                    </div>
                    <div className="text-center py-4 mt-3">
                      <MDBBtn gradient="aqua" type="submit" onClick={this.onFormSubmit}>
                        Login
                      </MDBBtn>
                    </div>
                  </form>
                  <div className="text-center py-4 mt-3">
                    <p className="font-small grey-text d-flex justify-content-center">
                      Don't have an account?
                      <button onClick={this.setNewClient} className="unstyled-button">
                        Sign up
                      </button>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Login;
