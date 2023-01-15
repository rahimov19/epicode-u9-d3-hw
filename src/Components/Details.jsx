/* eslint-disable no-unused-vars */
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
  Form,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function Details() {
  const params = useParams();
  console.log(params);

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const reviewToSend = {
    name: name,
    rate: rate,
    comment: comment,
  };
  const deleteHandler = async (reviewId) => {
    const options = {
      method: "DELETE",
    };
    try {
      const endpoint = `${apiUrl}/reviews/${params.imdbID}/reviews/${reviewId}`;
      const response = await fetch(endpoint, options);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmitHandler = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify(reviewToSend),
      headers: { "Content-type": "application/json" },
    };
    try {
      const endpoint = `${apiUrl}/reviews/${params.imdbID}/reviews`;
      const response = await fetch(endpoint, options);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const array = [];
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    fetchMovies();
    getReviews();
  }, []);

  async function fetchMovies(searchPar) {
    try {
      let response = await fetch(
        `https://www.omdbapi.com/?i=${params.imdbID}&apikey=383cbcb8`
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
  async function getReviews() {
    try {
      const endpoint = `${apiUrl}/reviews/${params.imdbID}/reviews/`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setReviews(data);
      console.log(reviews);
    } catch (error) {
      console.log(error);
    }
  }
  async function sendPDF() {
    const options = {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const endpoint = `${apiUrl}/files/savepdf`;
      const response = await fetch(endpoint, options);
    } catch (error) {
      console.log(error);
    }
    const pdfFile = `${apiUrl}/files/pdf3`;
    window.location.href = pdfFile;
  }

  return (
    <div>
      {movie ? (
        <>
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
                  <Button
                    variant="dark"
                    className="mr-2"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                  <Button variant="info" onClick={() => sendPDF()}>
                    Download as PDF
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>

          <Container style={{ color: "white" }}>
            <Row>
              <Col xs={12}>
                <h3>Reviews:</h3>
                {reviews[0] ? (
                  reviews.map((review) => (
                    <div>
                      <h5>{review.name}</h5>
                      <p>{review.rate}</p>
                      <p>{review.comment}</p>
                      <Button
                        variant="danger"
                        onClick={() => deleteHandler(review.id)}
                      >
                        Delete Comment
                      </Button>
                    </div>
                  ))
                ) : (
                  <h3>No reviews avaliable for this Movie</h3>
                )}
              </Col>
            </Row>
          </Container>
          <Container className="mt-4" style={{ color: "white" }}>
            <Row>
              <Col>
                <h4>Add new review:</h4>
                <Form>
                  <Form.Group className="mt-3">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control
                      placeholder="Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="w-100 mx-auto mt-3"
                    controlId="exampleForm.ControlSelect1"
                  >
                    <Form.Label>Select Rating</Form.Label>
                    <Form.Control
                      as="select"
                      placeholder="Comment"
                      onChange={(e) => {
                        setRate(e.target.value);
                      }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Enter your comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Button
                    variant="info"
                    className="mt-3"
                    onClick={onSubmitHandler}
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
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
