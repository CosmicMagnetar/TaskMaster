import { useState } from 'react';
import TaskModal from './TaskModal';

export default function TaskCard({ task, onDelete, onEdit, onToggleCompleted }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div 
      onClick={onToggleCompleted} 
      style={{ 
        background: task.completed ? "#D1FAE5" : "white",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        cursor: "pointer"
      }}
    >
      <button 
        style={{ fontSize: "24px", border: "none", background: "transparent", cursor: "pointer" }} 
        onClick={(e) => {
          e.stopPropagation(); 
          onToggleCompleted();
        }}
      >
        {task.completed ? '✅' : '🧃'}
      </button>

      <div>
        <h3 style={{
          fontWeight: "bold",
          fontSize: "18px",
          textDecoration: task.completed ? "line-through" : "none"
        }}>
          {task.title}
        </h3>
        <div style={{ fontSize: "14px", color: "#808080", display: "flex", gap: "16px", marginTop: "4px" }}>
          <span style={{ background: "#F0F0F0", padding: "4px 8px", borderRadius: "8px" }}>{task.category}</span>
          <span>{task.dueDate}</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          style={{ background: "#D1D1D1", padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation(); 
            setShowModal(true);
          }}
        >
          ✏️
        </button>
        <button
          style={{ background: "#F4A3A3", padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete();
          }}
        >
          🗑️
        </button>
      </div>

      {showModal && (
        <TaskModal
          existingTask={task}
          onSave={(updatedTask) => {
            onEdit(updatedTask);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
