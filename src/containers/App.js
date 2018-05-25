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
            isAuthenticated: false,
            token: '',
            user: null
        };
    }

    callback = (auth, token, user) => {
        this.userAuthenticated(auth, token, user);
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
            isAuthenticated: this.isAuthenticated,
            token: this.token,
            user: this.user,
            userAuthenticated: this.userAuthenticated
        };
        return (
            <div>
                <Routes childProps={childProps} />
            </div>
        );
    }
}

export default App;
