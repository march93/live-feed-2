import React, { Component } from "react";
import logo from '../logo.svg';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../styles/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

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
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            className="login-button"
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            LOGIN
          </Button>
        </form>
      </div>
    );
  }
}