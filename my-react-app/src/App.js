
import React, { useState } from "react";


function TaskItem({ task, onToggle, onDelete, onEdit }) {
  
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  
  function handleDoubleClick() {
    
    setEditing(true);
  }

  
  function handleKeyDown(e) {
    
    if (e.key === "Enter") {
      
      setEditing(false);
      
      onEdit(task.id, text);
    }
  }

  
  return (
    <li className="task-item">
      {editing ? (
        
        <input
          type="text"
          className="task-edit"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        
        <span
          className={`task-text ${task.completed ? "completed" : ""}`}
          onDoubleClick={handleDoubleClick}
        >
          {task.text}
        </span>
      )}
      <button className="task-toggle" onClick={() => onToggle(task.id)}>
        {task.completed ? "✅" : "⬜"}
      </button>
      <button className="task-delete" onClick={() => onDelete(task.id)}>
        🗑️
      </button>
    </li>
  );
}


function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}


function TaskForm({ onAdd }) {
  
  const [text, setText] = useState("");

  
  function handleSubmit(e) {
    
    e.preventDefault();
    
    if (text.trim()) {
      
      onAdd(text);
      
      setText("");
    }
  }

  
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст задачи"
      />
      <button type="submit" className="task-submit">
        Добавить
      </button>
    </form>
  );
}


function App() {
  
  const [tasks, setTasks] = useState([
    
    { id: 1, text: "Сделать домашнее задание", completed: false },
    { id: 2, text: "Посмотреть фильм", completed: true },
    { id: 3, text: "Приготовить ужин", completed: false },
  ]);

  
  function generateId() {
    
    return Math.max(...tasks.map((task) => task.id), 0) + 1;
  }


  

  
  function addTask(text) {
    
    const newTask = { id: generateId(), text, completed: false };
    
    setTasks([...tasks, newTask]);
  }

  
  function toggleTask(id) {
    
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  
  function deleteTask(id) {
    
    setTasks(tasks.filter((task) => task.id !== id));
  }

  
  function editTask(id, text) {
    
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text } : task))
    );
  }

  
  return (
    <div className="app">
      <h1 className="app-title">Список задач</h1>
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
  }


export default App;
