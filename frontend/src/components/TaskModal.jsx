import { useState, useEffect } from 'react';

export default function TaskModal({ onSave, onClose, existingTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || '');
      setCategory(existingTask.category || '');
      setDueDate(existingTask.dueDate || '');
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !dueDate) {
      alert('Please fill all fields');
      return;
    }

    const updatedTask = {
      ...existingTask,
      title,
      category,
      dueDate,
    };

    onSave(updatedTask);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "50" }}>
      <form
        onSubmit={handleSubmit}
        style={{ background: "white", padding: "24px", borderRadius: "16px", boxShadow: "0px 8px 16px rgba(0,0,0,0.2)", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "12px", color: "#5B21B6" }}>
          {existingTask ? "Edit Task" : "Add New Task"}
        </h2>

        <input
          type="text"
          placeholder="Task title"
          style={{ width: "100%", padding: "10px", border: "2px solid #A78BFA", borderRadius: "8px", fontSize: "16px", outline: "none" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          style={{ width: "100%", padding: "10px", border: "2px solid #A78BFA", borderRadius: "8px", fontSize: "16px", outline: "none" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px" }}>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: "12px", background: "#F3F4F6", borderRadius: "8px", fontSize: "16px", border: "none", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ padding: "12px", background: "linear-gradient(to right, #5B21B6, #A78BFA)", color: "white", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", border: "none", cursor: "pointer" }}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
