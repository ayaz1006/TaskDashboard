import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const TaskForm = ({ fetchTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ title: "", description: "", dueDate: "" });
      fetchTasks();
      setShowModal(false); // Close modal after submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="mb-4">
        Add Task
      </Button>

      {/* Modal for adding a new task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Task Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows={3}
                value={formData.description}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={formData.dueDate}
                onChange={onChange}
                required
              />
            </div>
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskForm;
