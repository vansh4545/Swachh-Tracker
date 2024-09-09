// Navbar.jsx

import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { getAccessToken } from '../utils/common-utils';
import ThemeToggle from '../themetoggle'; // Import custom theme toggle component

const CustomNavbar = ({ onLogout }) => {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-grey">
            <Container>
                <Navbar.Brand href="/">
                    SwachhTracker
                </Navbar.Brand>
               
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    className="custom-toggler"
                    style={{ borderColor: 'white' }} //color of hamburger menu icon
                />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link href="/home">
                            About
                        </Nav.Link>
                        <NavDropdown title="Garbage Pickup" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/request">Schedule Pickup</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/request/history">Pickup History</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                    <ThemeToggle/>
                        <Nav.Link href="/home">Contact Us</Nav.Link>
                        {getAccessToken ? (
        <>
          
          <Nav.Link href="/" onClick={onLogout}>Logout</Nav.Link>
        </>
      ) : (
        <Nav.Link href="/">Login</Nav.Link>
      )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
