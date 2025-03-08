import React, { useState, useEffect } from "react";

function Todo() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : []; // Load from localStorage
  });

  // Save tasks to localStorage whenever task list changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleChange(event) {
    setTodo(event.target.value);
  }

  function addTask() {
    if (todo.trim() !== "") {
      setTasks([...tasks, { text: todo, completed: false }]);
      setTodo("");
    }
  }

  function deleteTask(indexToDelete) {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  }

  function toggleTask(indexToToggle) {
    setTasks(
      tasks.map((task, index) =>
        index === indexToToggle ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function clearAll() {
    setTasks([]);
  }

  return (
    <div className="container">
      <h1>📝 To-Do App</h1>
      <h2>Total Tasks: {tasks.length}</h2>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Your Task"
          onChange={handleChange}
          value={todo}
        />
        <button className="add-btn" onClick={addTask}>Add Task</button>
        <button className="clear-btn" onClick={clearAll}>Clear All</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "done" : ""}>
            {task.text}
            <div className="btn-group">
              <button onClick={() => toggleTask(index)}>
                {task.completed ? "Mark Not Done" : "Mark Done"}
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
