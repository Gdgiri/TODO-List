import React, { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList({ items, toggleCompletion, deleteItem, saveItem, editItem }) {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredItems = items.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && item.completed) ||
      (filter === "notcomplete" && !item.completed);
    return (
      matchesFilter &&
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <div className="text-center p-5">
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search name"
      />
      <br />
      <label htmlFor="" className="sel">
        Status Filter:
      </label>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="bg-danger text-white sel"
      >
        <option value="all" className="option">
          All
        </option>
        <option value="completed" className="option">
          Completed
        </option>
        <option value="notcomplete" className="option">
          Not Completed
        </option>
      </select>
      <div className="d-flex align-item-left">
        <h5>My Todos</h5>
      </div>
      <ul className="container text-center p-5">
        {filteredItems.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
            toggleCompletion={toggleCompletion}
            deleteItem={deleteItem}
            saveItem={saveItem}
            editItem={editItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
