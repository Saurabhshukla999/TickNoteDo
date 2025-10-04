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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
      <div className="card">
      <div className="flex gap-4 mb-4">
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        className="border rounded-md p-2 space-y-6"
      />
     </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Add Task
      </button>

    </div>

<div className="space-y-2">
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
    </div>
  );
};

export default Tasks;
