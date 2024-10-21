import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const TaskItem = ({ task, fetchTasks }) => {
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.split("T")[0], // Format to YYYY-MM-DD
  });

  const toggleComplete = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${task._id}`,
        { completed: !task.completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/${task._id}`,
        updatedTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <tr
        onClick={() => setShowDetailsModal(true)}
        style={{ cursor: "pointer" }}
      >
        <td className="text-center">{task.title}</td>
        <td className="text-center d-none d-md-table-cell">
          {task.description}
        </td>
        <td className="text-center">
          {new Date(task.dueDate).toLocaleDateString()}
        </td>

        <td className="text-center">
          <div className="d-flex justify-content-center flex-nowrap">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComplete();
              }}
              className="btn btn-sm btn-success me-2"
              style={{ width: "150px" }}
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="btn btn-sm btn-warning me-2"
            >
              Update
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask();
              }}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* Modal for displaying task details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Title: {task.title}</h5>
          <p>Description: {task.description}</p>
          <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing task */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={updatedTask.title}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                value={updatedTask.description}
                onChange={(e) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formTaskDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={updatedTask.dueDate}
                onChange={(e) =>
                  setUpdatedTask({ ...updatedTask, dueDate: e.target.value })
                }
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskItem;
