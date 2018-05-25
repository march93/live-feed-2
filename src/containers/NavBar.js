import React, { Component } from 'react';
import '../styles/NavBar.css';
import { Link } from "react-router-dom";
import { Button, LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    logout = event => {
        this.props.callback(false, '', null);
    }

    render() {
        return (
            <div className="navbar container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                        <span>Live Feed App</span>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <LinkContainer to="/streams">
                                <NavItem>Live Streams</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/messages">
                                <NavItem>Messages</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/">
                                <NavItem onClick={() => this.logout()}>Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
