// Home.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyCard from "../MyCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap"; // thêm cái này

export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  return (
    <Container className="mt-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {students.map((student) => (
          <Col key={student.id}>
            <MyCard student={student} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
