import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function AddItemInputForm(props) {
  const [show, setShow] = useState(false)
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)  
  const handleSubmit = () => {
    props.onSubmit(author, text, date + '-' + month + '-' + year)
    setShow(false)
    setText("")
    setAuthor("")
  }
  

  return (
      <>
        <Button variant="primary" onClick={handleShow} block>
          Add new item
        </Button>

        <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => setAuthor(e.target.value)}
            />
        </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Item text</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              aria-label="ItemText"
              placeholder="Write your thoughts here"
              onChange={(e) => setText(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add item
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}
export default AddItemInputForm;