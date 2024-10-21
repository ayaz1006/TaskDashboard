import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container-fluid mt-5">
      <Navigation />
      <TaskForm fetchTasks={fetchTasks} />
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
