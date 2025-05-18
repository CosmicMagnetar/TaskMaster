import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NewTask({ onSave, existingTask, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || '');
      setDescription(existingTask.description || '');
      setCategory(existingTask.category || '');
      setDueDate(existingTask.dueDate || '');
    }
  }, [existingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !dueDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTask = {
      title,
      description,
      category,
      dueDate,
      completed: existingTask?.completed || false,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask); 
      onSave(response.data); 
      onCancel(); 
    } catch (error) {
      console.error('❌ Error saving task:', error);
      alert('Failed to save task.');
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #6D28D9, #FAD7A0)", padding: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0px 8px 16px rgba(0,0,0,0.2)", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "12px", color: "#5B21B6" }}>
          {existingTask ? 'Edit Task' : 'Create New Task'}
        </h2>

        <input
          placeholder="Title"
          style={{ width: "100%", padding: "10px", border: "2px solid #A78BFA", borderRadius: "8px", fontSize: "16px", outline: "none" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          style={{ width: "100%", padding: "10px", border: "2px solid #A78BFA", borderRadius: "8px", fontSize: "16px", outline: "none" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select
          style={{ width: "100%", padding: "10px", border: "2px solid #A78BFA", borderRadius: "8px", fontSize: "16px", outline: "none" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <input
          type="date"
          style={{ width: "100%", padding: "10px", border: "2px solid #A78BFA", borderRadius: "8px", fontSize: "16px", outline: "none" }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button
          type="submit"
          style={{ width: "100%", padding: "12px", background: "linear-gradient(to right, #5B21B6, #A78BFA)", color: "white", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", border: "none", cursor: "pointer", transition: "background 0.3s ease" }}
          onMouseOver={(e) => e.target.style.background = "linear-gradient(to right, #4C1D95, #8B5CF6)"}
          onMouseOut={(e) => e.target.style.background = "linear-gradient(to right, #5B21B6, #A78BFA)"}
        >
          Save Task
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ width: "100%", marginTop: "8px", padding: "12px", background: "#F3F4F6", borderRadius: "8px", fontSize: "16px", border: "none", cursor: "pointer", transition: "background 0.3s ease" }}
            onMouseOver={(e) => e.target.style.background = "#E5E7EB"}
            onMouseOut={(e) => e.target.style.background = "#F3F4F6"}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
