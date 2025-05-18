const categories = ['All', 'Personal', 'Work', 'Urgent', 'Completed', 'Sort by due date'];

export default function FilterBar({ selectedFilter, setSelectedFilter }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setSelectedFilter(cat)}
          style={{
            padding: "8px 16px",
            background: selectedFilter === cat ? "#7C3AED" : "#A78BFA",
            color: "white",
            borderRadius: "999px",
            cursor: "pointer",
            border: "none"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
