import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    redirectTo: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSumbit = event => {
    console.log(`Handling submit for ${this.state.username}`);
    event.preventDefault();

    // request to server
    axios
      .post("/api/users", {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (response.data) {
          console.log("successful sign-up");
          this.setState({
            redirectTo: "/login"
          });
        } else {
          console.log("Sign-Up Error");
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="userName">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <Button onClick={this.handleSumbit}>Submit</Button>
          </Form>
        </Container>
      );
    }
  }
}

export default SignUp;
