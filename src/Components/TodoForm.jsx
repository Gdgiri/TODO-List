import React, { useState } from "react";

function TodoForm({ addItem }) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");

  const handleAddItem = () => {
    if (input.trim() && description.trim()) {
      addItem(input.trim(), description.trim());
      setInput("");
      setDescription("");
    }
  };

  return (
    <div className="text-center p-5">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Item name"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Item description"
      />
      <button onClick={handleAddItem} className="btn btn-success">
        Add Todo
      </button>
    </div>
  );
}

export default TodoForm;
