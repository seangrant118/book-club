import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";
import axios from "axios";

class SignUp extends Component {

  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  }

  handleInputChange = event => {
    const {name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSumbit = event => {
    console.log(`Handling submit for ${this.state.username}`);
    event.preventdefault();
  }

  render() {
    return (
      <Container>
        <Form>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.state.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.state.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input
              type="text"
              name="userName"
              id="userName"
              placeholder="Username"
              value={this.state.username}
              onChange={this.state.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.state.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.state.handleInputChange}
            />
          </FormGroup>
          <Button
            onClick={this.state.handleSumbit}
          >Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default SignUp;
