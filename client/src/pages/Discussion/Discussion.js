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
    body: "",
    comments: []
  };

  componentDidMount() {
    this.getPost();
    this.getComments();
  }

  getComments = () => {
    Axios.get("/api/comments/" + this.props.match.params.id)
      .then(response => {
        console.log("Comment response")
        console.log(response.data);
        this.setState({
          comments: response.data
        });
      }).catch(error => {
        console.log("comment error");
        console.log(error);
      })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  deleteComment = commentId => {
    const { id: deleteId } = this.state.comments.find(({ id})=> commentId === id);
    Axios.delete(`/api/comments/${deleteId}`)
      .then(() => this.getComments())
      .catch(err => console.log(err));
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
      this.getComments();
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
      const { comments: savedComments } = this.state;

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
            {!savedComments.length ? ( <h1>This post has not comments yet!</h1>) : (
              savedComments.map(comment => {
                return (
                  <Row>
                    <Col size="md-12">
                      <Card key={comment.id}>
                        <CardBody>
                          <CardTitle>Comment by: {comment.user.username}</CardTitle>
                          <CardSubtitle>{comment.comment}</CardSubtitle>
                        </CardBody>
                        <Button 
                          color="danger"
                          size="sm"
                          onClick={() => this.deleteComment(comment.id)}>
                          Delete
                          </Button>
                      </Card>
                    </Col>
                  </Row>
                )
              })
            )}
          </Container>
        </div>
      );
    } else {
      return <h1>Loading data...</h1>;
    }
  }
}

export default Discussion;
