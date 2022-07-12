import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function nav()
{
    return(
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">User</Nav.Link>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
 
</Navbar>
    )
}
export default nav;