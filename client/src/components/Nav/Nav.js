import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

class NavBar extends Component {
  render() {
    return (
      <Nav>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/sign-up">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Log in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/posts">Log in</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default NavBar;
