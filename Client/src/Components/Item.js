import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function Item(props) {
  var [cntr, setCntr] = useState(0);

  return (
    <ListGroup.Item>
      <h3> {props.item.message} </h3>{" "}
      <p>
        {" "}
        [{props.item.name}][{props.item.date}]{" "}
      </p>{" "}
      <Button variant="info" onClick={() => setCntr(++cntr)}>
        Vote <Badge variant="light"> {cntr} </Badge>{" "}
        <span className="sr-only"> votes </span>{" "}
      </Button>{" "}
    </ListGroup.Item>
  );
}

export default Item;
