import React, { useState } from "react";

function TodoItem({
  item,
  index,
  toggleCompletion,
  deleteItem,
  saveItem,
  editItem,
}) {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [newDescription, setNewDescription] = useState(item.description);

  const handleSave = () => {
    saveItem(index, newName, newDescription);
    setEditing(false);
  };

  return (
    <li className="card">
      {editing ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </>
      ) : (
        <>
          <p
            style={{
              textDecoration: item.completed ? "line-through" : "none",
              fontWeight: "bold",
            }}
          >
            Name: {item.name}
          </p>
          <p
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            Description: {item.description}
          </p>
        </>
      )}
      <label htmlFor="" className="fw-bold laa">
        Status:
      </label>{" "}
      <select
        value={item.completed ? "completed" : "notcompleted"}
        onChange={() => toggleCompletion(index)}
        className="droping bg-danger text-white"
      >
        <option value="notcompleted">Not Completed</option>
        <option value="completed">Completed</option>
      </select>
      <br />
      <div className="d-flex justify-content-flex-end">
        <button
          onClick={() => (editing ? handleSave() : setEditing(!editing))}
          className="btn btn-success editBtn"
        >
          {editing ? "Save" : "Edit"}
        </button>
        <br />
        <button
          onClick={() => deleteItem(index)}
          className="btn btn-warning delbtn"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
