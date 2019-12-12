import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button } from 'reactstrap';

export default function NavbarComponent() {
    return (
        <div>
        <Navbar color="primary" dark expand="md" className="fixed-top">
          <NavbarBrand href="/"><h3>Sparveon</h3></NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button color="warning">Sign Up</Button>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
}
