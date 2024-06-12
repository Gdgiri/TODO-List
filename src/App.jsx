import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import Header from "./Components/Header";
import TodoList from "./Components/TodoList";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = localStorage.getItem("datas");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("datas", JSON.stringify(items));
  }, [items]);

  const addItem = (name, description) => {
    setItems([...items, { name, description, completed: false }]);
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

  return (
    <div className="App">
      <main>
        <Header />
        <TodoForm addItem={addItem} />
        <TodoList
          items={items}
          toggleCompletion={toggleCompletion}
          deleteItem={deleteItem}
          saveItem={saveItem}
          editItem={editItem}
        />
      </main>
    </div>
  );
}

export default App;
