/* eslint-disable no-unused-vars */
import { useState } from "react";
import { React } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function BackendModal2() {
  const [year, setYear] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  let movieId = "";
  const navigate = useNavigate();
  const submitMovie = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_BE_URL;
    const movieObject = {
      Title: title,
      Year: year,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(movieObject),
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const endpoint = `${apiUrl}/movies`;
      const response = await fetch(endpoint, options);
      movieId = await response.json();
      console.log(movieId);
    } catch (error) {
      console.log(error);
    }

    const formData = new FormData();
    formData.append("movie", image);
    const imageOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const endpoint = `${apiUrl}/files/${movieId.id}/cover`;
      const repsonse = await fetch(endpoint, imageOptions);
      console.log(repsonse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="orderComponent">
      <h1>Add new Movie</h1>

      <Container>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Movie Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="year">
            <Form.Label>Year of Production</Form.Label>
            <Form.Control
              type="number"
              min="1900"
              max="2099"
              step="1"
              placeholder="2023"
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Movie Poster</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button
              onClick={(e) => submitMovie(e)}
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}
