import React, { Component } from "react";
import { Col, Row, Container, Jumbotron } from "reactstrap";

class Posts extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Posts</h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Posts;