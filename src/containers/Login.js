import React, { Component } from 'react';
import logo from '../logo.svg';
import { Button } from 'react-bootstrap';
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
    var thisProps = this.props;
    console.log('logged successfully with ' + method);

    // Get Google Access Token
    request
        .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + response.access_token)
        .end(function(err, res){
        if (res.body) {
            // Verify Access Token
            request
                .get('https://polar-shelf-99397.herokuapp.com/v1/api/getJWTToken')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .query({ email: res.body.email, token: response.access_token })
                .end(function(err, response){
                    if (response.body) {
                        thisProps.history.push('/streams');
                        thisProps.userAuthenticated(true, response.body.access_token, res.body.email);
                    }
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