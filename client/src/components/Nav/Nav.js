import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <Nav>
        <NavItem>
          <NavLink tag={Link} to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/sign-up">Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/login">Log in</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/posts">Posts</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default NavBar;
