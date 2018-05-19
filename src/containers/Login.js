import React, { Component } from 'react';
import logo from '../logo.svg';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../styles/Login.css';
import request from 'superagent';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
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
        <form onSubmit={this.handleSubmit}>
          <Button
            className="login-button"
            block
            bsSize="large"
            type="submit"
          >
            Sign in with YouTube account
          </Button>
        </form>
      </div>
    );
  }
}