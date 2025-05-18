import React, { useState, useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import logo from '../assets/LogoTask.png';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");

  // ✅ Fetch tasks from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("❌ Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  // ✅ Add Task to Database
  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, addedTask]); // Update state with new task
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  // ✅ Edit Task
  const handleEditTask = async (updatedTask) => {
    try {
      const editedTask = await updateTask(updatedTask._id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === editedTask._id ? editedTask : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("❌ Error editing task:", error);
    }
  };

  // ✅ Delete Task from Database
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  // ✅ Toggle Completed Status
  const handleToggleCompleted = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("❌ Error toggling task status:", error);
    }
  };

  // ✅ Filter tasks dynamically
  const filteredTasks = tasks.filter((task) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Completed") return task.completed;
    if (selectedFilter === "Not Completed") return !task.completed;
    if (selectedFilter === "Urgent") return task.category === "Urgent";
    return task.category === selectedFilter;
  });

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "linear-gradient(to bottom, purple, #FAD7A0)", padding: "24px", color: "black", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={logo} alt="Logo" width={80} />
          <h1 style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold" }}>TaskMaster</h1>
        </div>
        <div style={{ backgroundColor: "#5B21B6", color: "white", padding: "8px 16px", borderRadius: "999px" }}>
          Welcome, Krishna ➔
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {["All", "Personal", "Work", "Urgent", "Completed", "Not Completed"].map(filter => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            style={{
              padding: "8px 16px",
              background: selectedFilter === filter ? "#7C3AED" : "#A78BFA",
              color: "white",
              borderRadius: "999px",
              cursor: "pointer",
              border: "none"
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onDelete={() => handleDeleteTask(task._id)} 
              onEdit={() => setEditingTask(task)} 
              onToggleCompleted={() => handleToggleCompleted(task._id)} 
            />
          ))
        ) : (
          <p style={{ color: "white", fontSize: "1.2rem", textAlign: "center" }}>
            No tasks found. Add a task to get started!
          </p>
        )}
      </div>

      {/* Add Task Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{ padding: "10px 20px", borderRadius: "999px", color: "white", background: "linear-gradient(to right, purple, pink)", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", border: "none", cursor: "pointer" }}
        >
          Add New Task
        </button>
      </div>

      {/* TaskModal for Adding a New Task */}
      {showModal && (
        <TaskModal onSave={handleAddTask} onClose={() => setShowModal(false)} />
      )}

      {/* TaskModal for Editing a Task */}
      {editingTask && (
        <TaskModal existingTask={editingTask} onSave={handleEditTask} onClose={() => setEditingTask(null)} />
      )}
    </div>
  );
}
