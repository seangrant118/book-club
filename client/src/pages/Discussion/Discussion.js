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
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";

class Discussion extends Component {
  state = {
    post: {},
    modal: false,
    body: ""
  };

  componentDidMount() {
    this.getPost();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleComment = event => {
    event.preventDefault();
    Axios.post("/api/comments", {
      comment: this.state.body,
      userId: this.props.id,
      postId: this.props.match.params.id
    }).then(response => {
      if (response.data) {
        console.log("sent")
      } else {
        console.log("not sent");
      }
      this.toggle();
      this.setState({
        body: ""
      })
    })
  }

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to={{ pathname: "/login" }} />;
    } else if (Object.keys(this.state.post).length !== 0) {
      const { post: savedPost } = this.state;
      const { user } = savedPost;

      return (
        <div>
          <Jumbotron>
            <h1>Post Title: {savedPost.title}</h1>
            <h3>By: {savedPost.user.username}</h3>
          </Jumbotron>
          <Container>
            <CardBody>{savedPost.body}</CardBody>
            <Button onClick={this.toggle}>Add a Comment</Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Leave a Comment</ModalHeader>
              <ModalBody>
                <Form>
                <FormGroup>
                    <Label for="body">Body</Label>
                    <Input
                      type="textarea"
                      name="body"
                      id="body"
                      placeholder="Body"
                      value={this.state.body}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleComment}>
                  Submit
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Container>
        </div>
      );
    } else {
      return <h1>Loading data...</h1>;
    }
  }
}

export default Discussion;
