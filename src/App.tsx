import { useState, useEffect } from 'react';
import './App.css';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? (JSON.parse(stored) as Task[]) : [];
  });
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const saveTask = () => {
    const trimmed = taskText.trim();
    if (!trimmed) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  return (
    <div className="app">
      <h1>Tasks</h1>
      <div className="add-task">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task"
          name="task_field"
        />
        <button onClick={saveTask}>Add Task</button>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task_div ${task.completed ? 'completed' : ''}`}
          >
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
      {tasks.some((t) => t.completed) && (
        <button className="clear" onClick={clearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default App;
