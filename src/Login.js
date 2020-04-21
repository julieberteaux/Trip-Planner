import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAlert } from 'mdbreact';
import { Redirect } from 'react-router-dom';

const usersJson = {
  description: 'Login and passwords of users',
  users: {
    julie: {
      password: 'berteaux',
    },
    pg: {
      password: 'leymarie',
    },
  },
};

class Login extends React.Component {
  state = {
    userName: '',
    password: '',
    loginVerified: false,
    newClient: false,
    displayError: false,
    usersJson: {},
  };

  componentDidMount() {
    // const usersJson = localStorage.getItem('user');
    // console.log(usersJson);
    // if (usersJson) {
    //   try {
    //     this.setState({ usersJson: JSON.parse(usersJson) });
    //   } catch (e) {
    //     this.setState({ usersJson: {} });
    //   }
    // } else {
    //   this.setState({ usersJson: {} });
    // }
    this.setState({ usersJson });
  }

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
    const { usersJson, userName, password } = this.state;
    const filterUserName = Object.keys(usersJson.users).filter((e) => e === userName);
    if (filterUserName.length > 0 && usersJson.users[userName].password === password) {
      this.setState({ loginVerified: true });
      //window.localStorage.setItem('user', JSON.stringify(usersJson.users[userName]));
    } else {
      this.setState({ displayError: true });
    }
  };

  render() {
    if (this.state.loginVerified) {
      return <Redirect push to={`/userName/${this.state.userName}`}></Redirect>;
    }
    if (this.state.newClient) {
      return <Redirect push to={`/register`}></Redirect>;
    }
    return (
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

                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      type="text"
                      getValue={(value) => this.getLoginData(value, 'userName')}
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
    );
  }
}

export default Login;
