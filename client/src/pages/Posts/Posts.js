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

import Axios from "axios";

class Posts extends Component {
  state = {
    title: "",
    body: "",
    img: "",
    posts: []
  };

  componentDidMount() {
    this.setState({
      loggedIn: this.props.loggedIn,
      username: this.props.username
    });

    this.getPosts();
  }

  getPosts = () => {
    Axios.get("/api/posts")
      .then(response => {
        console.log("Post response");
        console.log(response.data);
        this.setState({
          posts: response.data
        });
      })
      .catch(error => {
        console.log("post error");
        console.log(error);
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSumbit = event => {
    event.preventDefault();
    console.log(this.props.id);
    Axios.post("/api/posts", {
      title: this.state.title,
      body: this.state.body,
      img: this.state.img,
      userId: this.props.id
    })
      .then(response => {
        if (response.data) {
          console.log("sent");
        } else {
          console.log("not sent");
        }
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      title: "",
      body: "",
      img: ""
    });
  };

  render() {

    const {posts: savedPosts} = this.state;

    return (
      <div>
        <Jumbotron>
          <h1>Posts</h1>
        </Jumbotron>
        <Container>
          <Row>
            <Col size="md-12">
              <Form>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
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
                <FormGroup>
                  <Label for="img">Image Url</Label>
                  <Input
                    type="text"
                    name="img"
                    id="img"
                    placeholder="Image Url"
                    value={this.state.img}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <Button onClick={this.handleSumbit}>Submit</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {!savedPosts.length ? (<h1>No Posts Found</h1>) : (
              savedPosts.map(post => {
                return (
                  <Card>
                    <CardImg src={post.img}/>
                    <CardBody>
                      <CardTitle>{post.title}</CardTitle>
                      <CardSubtitle>Post ID: {post.id}</CardSubtitle>
                      <CardText>{post.body}</CardText>
                    </CardBody>
                  </Card>
                )
              })
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Posts;
