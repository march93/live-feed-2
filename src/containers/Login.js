import React, { Component } from 'react';
import logo from '../logo.svg';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../styles/Login.css';
import request from 'superagent';
import ReactModalLogin from 'react-modal-login';
import { googleConfig } from './social-config';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showModal: false,
        loading: false,
        error: null
    };
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }
 
  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }
  
  onLoginSuccess(method, response) {
    console.log('logged successfully with ' + method);

    request
        .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + response.access_token)
        .end(function(err, res){
        if (res.body) {
            // Verify Access Token
            request
                // .post('http://127.0.0.1:5000/v1/api/tokenVerify')
                .post('http://127.0.0.1:5000/user')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({ username: "Mike", password: "Crispie" })
                .end(function(err, res){
                console.log(res.text);
}); 
        } else {
            console.log("User's Google info not found");
        }
    });

    this.finishLoading();
    this.closeModal();
  }
 
  onLoginFail(method, response) {
    console.log('logging failed with ' + method);
    this.finishLoading();
    this.setState({
      error: response
    });
  }
 
  startLoading() {
    this.setState({
      loading: true
    });
  }
 
  finishLoading() {
    this.setState({
      loading: false
    });
  }
 
  afterTabsChange() {
    this.setState({
      error: null
    });
  }


  handleSubmit = event => {
    event.preventDefault();

    request
        .post('http://127.0.0.1:5000/user')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({ username: "Mike", password: "Crispie" })
        .end(function(err, res){
        console.log(res.text);
    });  

    // Show NavBar if user successfully logs in
    // this.props.isNavbarHidden(false);
  }

  render() {
    return (
      <div className="Login">
        <header className="login-header">
          <img src={logo} className="login-logo" alt="logo" />
          <h1 className="login-title">Login to Live-Feed</h1>
        </header>

        <Button
            onClick={() => this.openModal()}
            className="login-button"
            block
            bsSize="large"
            type="submit"
        >
            Sign in with YouTube account
        </Button>

        <ReactModalLogin
            visible={this.state.showModal}
            onCloseModal={this.closeModal.bind(this)}
            loading={this.state.loading}
            error={this.state.error}
            tabs={{
                afterChange: this.afterTabsChange.bind(this)
            }}
            loginError={{
                label: "Couldn't sign in, please try again."
            }}
            registerError={{
                label: "Couldn't sign up, please try again."
            }}
            startLoading={this.startLoading.bind(this)}
            finishLoading={this.finishLoading.bind(this)}
            providers={{
                google: {
                    config: googleConfig,
                    onLoginSuccess: this.onLoginSuccess.bind(this),
                    onLoginFail: this.onLoginFail.bind(this),
                    label: "Continue with Google"
                }
            }}
        />
      </div>
    );
  }
}