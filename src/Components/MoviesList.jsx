import React, { Component } from "react";
import { Carousel, Row, Spinner, Col, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export default class MoviesList extends Component {
  state = {
    fetchedMovies: null,
  };

  componentDidMount() {
    this.fetchMovies(this.props.searchPar);
  }
  fetchMovies = async (searchPar) => {
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?s=${searchPar}&apikey=383cbcb8`
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setTimeout(() => {
          this.setState({ fetchMovies: data });
          console.log(this.state);
        }, 1000);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div className="movie-gallery m-2">
          <h3 className="text-light mt-5 mb-2">{this.props.title}</h3>
          <Carousel>
            <div className="carousel-inner">
              <Carousel.Item className="active">
                <div className="movie-row">
                  <Row className="row" id="first_row">
                    {this.state.fetchMovies ? (
                      this.state.fetchMovies.Search.slice(0, 6).map((movie) => (
                        <Col md={2} key={movie.imdbID}>
                          <img
                            className="movie-cover"
                            src={movie.Poster}
                            alt={movie.title}
                          />
                          <Link to={"/details/" + movie.imdbID}>
                            <Button
                              variant="dark"
                              className="btn-dark btn infobtn"
                            >
                              {/* <ModalInfo
                              headertitle={movie.Title}
                              bodyimg={movie.Poster}
                              bodytext={movie.imdbID}
                            /> */}
                              Details
                            </Button>
                          </Link>
                          <div className="fadeout"></div>
                          <div className="fadeoutText">
                            <h3>{movie.Title}</h3>{" "}
                            <p className="imageDescription">${movie.Year}</p>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    )}
                  </Row>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="movie-row">
                  <Row className="row" id="first_row2">
                    {this.state.fetchMovies ? (
                      this.state.fetchMovies.Search.slice(6, 6).map((movie) => (
                        <Col md={2} key={movie.imdbID}>
                          <img
                            className="movie-cover"
                            src={movie.Poster}
                            alt={movie.title}
                          />
                          <a href="index.html" className="btn-dark btn infobtn">
                            Info
                          </a>
                          <div className="fadeout"></div>
                          <div className="fadeoutText">
                            <h3>{movie.Title}</h3>{" "}
                            <p className="imageDescription">${movie.Year}</p>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                      </Spinner>
                    )}
                  </Row>
                </div>
              </Carousel.Item>
            </div>
          </Carousel>
        </div>
      </>
    );
  }
}
