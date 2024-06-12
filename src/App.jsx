import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedItems = localStorage.getItem("datas");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("datas", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (input.trim() && description.trim()) {
      setItems([
        ...items,
        {
          name: input.trim(),
          description: description.trim(),
          completed: false,
        },
      ]);
      setInput("");
      setDescription("");
    }
  };

  const editItem = (index) => {
    const newItems = [...items];
    newItems[index].editing = !newItems[index].editing;
    setItems(newItems);
  };

  const saveItem = (index, newName, newDescription) => {
    const newItems = [...items];
    newItems[index].name = newName;
    newItems[index].description = newDescription;
    newItems[index].editing = false;
    setItems(newItems);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

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
    <div className="App">
      <header>
        <h1 className="bg-light text-center text-success p-5">My todo</h1>
      </header>
      <main>
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
          <button onClick={addItem} className="btn btn-success">
            Add Todo
          </button>

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
        </div>
        <ul className="container text-center p-5">
          {filteredItems.map((item, index) => (
            <li key={index} className="card">
              {item.editing ? (
                <>
                  <input
                    type="text"
                    defaultValue={item.name}
                    onBlur={(e) =>
                      saveItem(index, e.target.value, item.description)
                    }
                  />
                  <input
                    type="text"
                    defaultValue={item.description}
                    onBlur={(e) => saveItem(index, item.name, e.target.value)}
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
                  onClick={() => editItem(index)}
                  className="btn btn-success editBtn"
                >
                  {item.editing ? "Save" : "Edit"}
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
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
