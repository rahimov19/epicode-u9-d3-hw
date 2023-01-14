import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MoviesList from "./MoviesList";

export default class TVShows extends Component {
  render() {
    return (
      <Container fluid>
        <h1 className="text-light">TV Shows</h1>
        <MoviesList search="Simpsons" title="Yellow Childhood" par="series" />
        <MoviesList search="Sherlock" title="Detective Time" par="series" />
        <MoviesList search="Lost" title="Time to find'em" par="series" />
      </Container>
    );
  }
}
