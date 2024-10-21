import React, { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, fetchTasks }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "completed", "pending"

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesDate =
      selectedDate === "" ||
      new Date(task.dueDate).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString();
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed);

    return matchesDate && matchesStatus;
  });

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  return (
    <div>
      <div className="text-center mb-4">
        <h3>Filter Tasks</h3>
      </div>
      <div className="mb-3">
        <label htmlFor="dueDateFilter" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          className="form-control"
          id="dueDateFilter"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          id="statusFilter"
          value={filterStatus}
          onChange={handleStatusChange}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="pending">Pending Tasks</option>
        </select>
      </div>

      <div className="text-center mb-4">
        <h3>Pending Tasks</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-light text-center">
            <tr>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Description</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingTasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No pending tasks
                </td>
              </tr>
            ) : (
              pendingTasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mb-4">
        <h3>Completed Tasks</h3>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-light text-center">
            <tr>
              <th>Title</th>
              <th className="d-none d-md-table-cell">Description</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No completed tasks
                </td>
              </tr>
            ) : (
              completedTasks.map((task) => (
                <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
