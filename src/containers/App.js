import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "../Routes";
import NavBar from './NavBar';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            navbarHidden: true,
            isAuthenticated: false,
            token: '',
            user: null
        };
    }

    callback = (nav, auth, token, user) => {
        this.isNavbarHidden(nav);
        this.userAuthenticated(auth, token, user);
    }

    isNavbarHidden = hidden => {
        this.setState({ navbarHidden: hidden });
    }

    userAuthenticated = (authenticated, curToken, curUser) => {
        this.setState({ 
            isAuthenticated: authenticated,
            token: curToken,
            user: curUser
        });
    }

    render() {
        const childProps = {
            navbarHidden: this.state.navbarHidden,
            isNavbarHidden: this.isNavbarHidden,
            isAuthenticated: this.isAuthenticated,
            token: this.token,
            user: this.user,
            userAuthenticated: this.userAuthenticated
        };
        let navHeader = this.state.navbarHidden ? '' : <NavBar callback={this.callback} />;
        return (
            <div>
                {navHeader}
                <Routes childProps={childProps} />
            </div>
        );
    }
}

export default App;
