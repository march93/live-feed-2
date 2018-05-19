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
            isAuthenticated: false
        };
    }

    isNavbarHidden = hidden => {
        this.setState({ navbarHidden: hidden });
    }

    userAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    render() {
        const childProps = {
            navbarHidden: this.state.navbarHidden,
            isNavbarHidden: this.isNavbarHidden
        };
        let navHeader = this.state.navbarHidden ? '' : <NavBar />;
        return (
            <div>
                {navHeader}
                <Routes childProps={childProps} />
            </div>
        );
    }
}

export default App;
