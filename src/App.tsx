import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  function save_task() {
    setTasks([...tasks, task]);
    setTask("");
    

  }
  useEffect(() => {console.log(tasks);}, [tasks])
  return (
    <>
      <div>
        <input
          onChange={(e) => setTask(e.target.value)}
          type="text"
          value={task}
          name="task_field"
        />
        <button onClick={() => save_task()}>Save 1 Task</button>
      </div>
      <div>
          {tasks.map((task, index) => (
            <div className="task_div" key={index}>
              <p>{task}</p>
            </div>  
          ))}
      </div>
    </>
  );
}

export default App;
