import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MoviesList from "./MoviesList";

export default class TVShows extends Component {
  render() {
    return (
      <Container fluid>
        <h1 className="text-light">TV Shows</h1>
        <MoviesList searchPar="Simpsons" title="Yellow Childhood" />
        <MoviesList searchPar="Sherlock" title="Detective Time" />
        <MoviesList searchPar="Lost" title="Time to find'em" />
      </Container>
    );
  }
}
