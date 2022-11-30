import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
export default function ModalInfo({ bodyimg, bodytext, headertitle }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="dark" className="infobtn2" onClick={handleShow}>
        Info
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{headertitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={bodyimg} alt="movie"></img>
          </div>
          <div>{bodytext}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
