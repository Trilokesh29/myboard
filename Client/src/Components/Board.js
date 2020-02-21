import React from "react";
import Column from "./Column";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Board() {
  return (
    <Container fluid>
      <Row>
        <Column name="Good" />
        <Column name="Bad" />
        <Column name="Ugly" />
      </Row>{" "}
    </Container>
  );
}

export default Board;
