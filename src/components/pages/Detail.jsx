import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Detail() {
  const { id } = useParams(); // ✅ Lấy id từ URL
  const [student, setStudent] = useState(null); // ✅ Khai báo state

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${id}`
        );
        setStudent(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sinh viên:", error);
      }
    };

    fetchStudent();
  }, [id]); // ✅ Thêm id vào dependency array

  if (!student) return <div>Loading...</div>;
  return (
    <Card
      className="d-flex flex-column"
      style={{ width: "24rem", margin: "20px auto" }}
    >
      <Card.Img variant="top" src={student.image} />
      <Card.Body>
        {/* <Card.Title>{student.name}</Card.Title> */}
        <Card.Text>
          <strong>Name:</strong> {student.name}
        </Card.Text>
        <Card.Text>
          <strong>ID:</strong> {student.id}
        </Card.Text>
        <Card.Text>
          <strong>Date of Birth:</strong> {student.dateofbirth}
        </Card.Text>
        <Card.Text>
          <strong>Gender:</strong> {student.gender ? "Male" : "Female"}
        </Card.Text>
        <Card.Text>
          <strong>Class:</strong> {student.class}
        </Card.Text>
        <Card.Text>
          <strong>Feedback:</strong> {student.feedback}
        </Card.Text>
        <Button variant="primary" href="/">
          Quay lại trang chủ
        </Button>
      </Card.Body>
    </Card>
  );
}
