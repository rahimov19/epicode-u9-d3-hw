import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <div id="cat404">
            <img
              src="https://static.vecteezy.com/system/resources/previews/004/447/618/original/design-layout-for-the-404-error-page-not-found-with-a-silhouette-of-a-cat-on-the-background-of-a-window-vector.jpg"
              alt="cat"
            ></img>
          </div>
        </Container>
      </div>
    );
  }
}
