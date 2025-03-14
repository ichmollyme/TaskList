import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    completedTask: true,
  });

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  console.log(tasks);

  return (
    <div className="app">
      {/* Task List with Priority */}
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {openSection.taskList && <TaskForm addTask={addTask} />}
      </div>
      {/* Tasks */}
      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button className="sort-button">By Date</button>
          <button className="sort-button">By Priority</button>
        </div>
        {openSection.tasks && <TaskList />}
      </div>
      {/* Completed Tasks */}
      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completedTask ? "open" : ""}`}
          onClick={() => toggleSection("completedTask")}
        >
          +
        </button>
        {openSection.completedTask && <CompletedTaskList />}
      </div>
      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      {/* Поле ввода для заголовка задачи */}
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Выпадающий список для выбора приоритета */}
      <select
        name=""
        id=""
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Поле ввода для срока выполнения */}
      <input
        type="datetime-local"
        value={deadline}
        required
        onChange={(e) => setDeadline(e.target.value)}
      />

      {/* Кнопка для отправки формы */}
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskList() {
  return (
    <ul className="task-list">
      <TaskItem />
    </ul>
  );
}

function TaskItem() {
  return (
    <li className="task-item ">
      <div className="task-info">
        <div>
          Title <strong>Medium</strong>
        </div>
        <div className="task-deadline">Due: {new Date().toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        <button className="complete-button">Complete</button>
        <button className="delete-button">Delete</button>
      </div>
    </li>
  );
}

function CompletedTaskList() {
  return (
    <ul className="completed-task-list">
      <TaskItem />
    </ul>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional rendering, array methods (map,
        filter), event handling.
      </p>
    </footer>
  );
}

export default App;
