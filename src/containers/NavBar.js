import React, { Component } from 'react';
import '../styles/NavBar.css';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class NavBar extends Component {
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
                            <LinkContainer to="/feeds">
                                <NavItem>Live Feeds</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/messages">
                                <NavItem>Messages</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/logout">
                                <NavItem>Logout</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
