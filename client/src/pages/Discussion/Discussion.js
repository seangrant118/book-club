import React, { Component } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

import Axios from "axios";

class Discussion extends Component {
  state = {
    post: {}
  };

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    Axios.get("/api/posts/" + this.props.match.params.id)
      .then(response => {
        console.log("Get Post by ID");
        console.log(response.data);
        this.setState({
          post: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else if (Object.keys(this.state.post).length !== 0) {
      const { post: savedPost } = this.state;
      const { user } = savedPost;
      console.log(user);
      console.log(savedPost);
      return (
        <div>
          <Jumbotron>
            <h1>Post Title: {savedPost.title}</h1>
            <h3>By: {savedPost.user.username}</h3>
          </Jumbotron>
          <Container>
            <div>{savedPost.body}</div>
          </Container>
        </div>
      );
    } else {
      return <h1>Loading data...</h1>;
    }
  }
}

export default Discussion;
