import React, { useState } from "react";

const Tasks = () => {
  const [taskInput, setTaskInput] = useState(""); // for input
  const [tasks, setTasks] = useState([]); // for all tasks

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInput) return;

    const newTask = taskInput; // simple string task
    setTasks([...tasks, newTask]); // add to array
    setTaskInput(""); // reset input
  };

  const deleteTask = (indexToRemove) => {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="border rounded-md p-2"
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Add Task
      </button>

      <ol className="list-decimal pl-5">
        {tasks.map((task, index) => (
          <li key={index} className="my-2 p-2 border rounded flex justify-between items-start">
            <span>{task}</span>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Tasks;
