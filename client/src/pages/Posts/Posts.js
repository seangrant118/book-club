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
  Jumbotron
} from "reactstrap";
import Axios from "axios";

class Posts extends Component {
  state = {
    title: "",
    body: "",
    img: ""
  };

  componentDidMount () {
    this.setState({
      loggedIn: this.props.loggedIn,
      username: this.props.username
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSumbit = event => {
    event.preventDefault();

    Axios.post("/api/posts", {
      title: this.state.title,
      body: this.state.body,
      img: this.state.img
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
        </Container>
      </div>
    );
  }
}

export default Posts;
