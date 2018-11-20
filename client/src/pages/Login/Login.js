import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSumbit = event => {
    event.preventDefault();

    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
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

export default Login;
