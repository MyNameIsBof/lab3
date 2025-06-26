import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

function Management() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  function handleDelete(id) {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/${id}`)
        .then(() => {
          alert("Sinh viên đã được xóa thành công.");
          fetchStudents();
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  }

  return (
    <div className="container mt-4">
      <h2>Quản lý sinh viên</h2>
      <Link to="/addStudent">
        <Button className="mb-2">+ Thêm sinh viên</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Gender</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.class}</td>
              <td>{stu.gender ? "Nam" : "Nữ"}</td>
              <td>
                <Link to={`/students/${stu.id}`}>
                  <Button size="sm" variant="info" className="me-2">
                    Xem
                  </Button>
                </Link>
                <Link to={`/edit/${stu.id}`}>
                  <Button size="sm" variant="warning" className="me-2">
                    Sửa
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(stu.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Management;
