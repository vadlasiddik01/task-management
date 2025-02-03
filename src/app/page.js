"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Analytics } from "@vercel/analytics/react"
import "./task-manager.css"; // Updated CSS file

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks");
      // Sort tasks: not completed tasks first, then by due date
      const sortedTasks = res.data.sort((a, b) => {
        if (a.completed === b.completed) {
          return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date
        }
        return a.completed ? 1 : -1; // Not completed tasks first
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.post("/api/tasks", { title, description, dueDate });
      setTasks((prevTasks) => [...prevTasks, res.data]);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const res = await axios.put("/api/tasks", { id: currentTask._id, title, description, dueDate });
      setTasks((prevTasks) => prevTasks.map(task => task._id === currentTask._id ? res.data : task));
      resetForm();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setIsEditing(false);
    setCurrentTask(null);
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put("/api/tasks", { id, completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete("/api/tasks", { data: { id } });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate);
    setCurrentTask(task);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <div className="form-container">
        {/* Form for adding tasks */}
        <form onSubmit={isEditing ? editTask : addTask} className="task-form">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <button type="submit">{isEditing ? "Update Task" : "Add Task"}</button>
        </form>
      </div>
      <div className="task-list-container">
        {/* Task list rendering */}
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-card-header">
              <h3 className={task.completed ? "task-completed" : ""} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </h3>
              <p className="task-due">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <p className="task-description" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.description}
            </p>
            <div className="task-actions">
              <button onClick={() => toggleComplete(task._id, task.completed)} className={task.completed ? "undo" : "complete"}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEditClick(task)} className="edit">Edit</button>
              <button onClick={() => deleteTask(task._id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
