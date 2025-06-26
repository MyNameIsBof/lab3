import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    gender: "true",
    dateOfBirth: "",
    class: "",
    feedback: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    if (!form.name || form.name.trim().split(" ").length < 2)
      return "Tên phải có ít nhất 2 từ.";
    if (!form.image.startsWith("http")) return "Ảnh phải là URL.";
    if (!form.dateOfBirth) return "Ngày sinh không được bỏ trống.";
    if (!form.class) return "Lớp không được bỏ trống.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    try {
      await axios.post(import.meta.env.VITE_API_URL, {
        ...form,
        gender: form.gender === "true",
      });
      navigate("/management");
    } catch (error) {
      console.error("Lỗi khi thêm sinh viên:", error);
      setError("Không thể thêm sinh viên. Vui lòng thử lại.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Thêm sinh viên</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Họ và tên</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ảnh (URL)</Form.Label>
          <Form.Control
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Giới tính</Form.Label>
          <Form.Select
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày sinh</Form.Label>
          <Form.Control
            type="date"
            value={form.dateOfBirth}
            onChange={(e) =>
              setForm({ ...form, dateOfBirth: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Lớp</Form.Label>
          <Form.Control
            type="text"
            value={form.class}
            onChange={(e) => setForm({ ...form, class: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Thêm sinh viên
        </Button>
      </Form>
    </Container>
  );
}