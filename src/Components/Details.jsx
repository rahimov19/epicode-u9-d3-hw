/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Spinner,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  console.log(params);

  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies(searchPar) {
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?i=${params.imdbID}&apikey=383cbcb8`
      );
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setTimeout(() => {
          setMovie(data);
          console.log(movie);
        }, 3000);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {movie ? (
        <Card className="detailsCard">
          <Row>
            <Col>
              <Card.Img variant="top" src={movie.Poster} />
            </Col>
            <Col className="colCard">
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Plot}</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Genre: {movie.Genre}</ListGroupItem>
                <ListGroupItem>Director: {movie.Director}</ListGroupItem>
                <ListGroupItem>Released {movie.Released}</ListGroupItem>
                <ListGroupItem>Runtime {movie.Runtime}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button variant="dark" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ) : (
        <Container className="spinnerO">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Container>
      )}
    </div>
  );
}
