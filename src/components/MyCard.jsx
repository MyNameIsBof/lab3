import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function MyCard({ student }) {
  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={student.image}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>{student.class}</Card.Text>
        <Button
          variant="primary"
          href={`/student/${student.id}`}
          className="mt-auto"
        >
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}
