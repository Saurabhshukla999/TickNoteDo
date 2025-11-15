import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Tasks = () => {
  const [taskInput, setTaskInput] = useState(""); // for input
  const [tasks, setTasks] = useState([]); // for all tasks
  const [loading, setLoading] = useState(false);
  const { getAuthHeaders } = useAuth();

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks', {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else if (response.status === 401) {
        console.error('Unauthorized - please login again');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskInput) return;

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text: taskInput }),
      });
      
      if (response.ok) {
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
        setTaskInput(""); // reset input
      } else if (response.status === 401) {
        console.error('Unauthorized - please login again');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else if (response.status === 401) {
        console.error('Unauthorized - please login again');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
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
      {loading && <p>Loading tasks...</p>}
      <ol className="list-decimal pl-5">
        {tasks.map((task) => (
          <li key={task._id} className="my-2 p-2 border rounded flex justify-between items-start">
            <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
            <button
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteTask(task._id)}
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
