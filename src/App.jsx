import "@radix-ui/themes/styles.css";
import React from "react";
import "./index.css";
import { Button, Box, Flex, Grid, Section } from "@radix-ui/themes";
import { Link, Route, Routes } from "react-router-dom";
import Timer from "./pages/timer";
import Notes from "./pages/notes";
import Tasks from "./pages/Tasks";


function App() {
  return (
     <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">Productivity App</h1>
              <div className="flex gap-4">
                <Link to="/" className="btn hover:text-blue-600">Home</Link>
                <Link to="/notes" className="btn hover:text-blue-600">Notes</Link>
                <Link to="/tasks" className="btn hover:text-blue-600">Tasks</Link>
                <Link to="/timer" className="btn hover:text-blue-600">Timer</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container-custom py-8">
          <Routes>
            <Route path="/notes" element={<Notes />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/" element={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Notes</h2>
                  <p className="text-gray-600">Keep track of your important thoughts and ideas.</p>
                </div>
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                  <p className="text-gray-600">Manage your daily tasks and stay organized.</p>
                </div>
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Timer</h2>
                  <p className="text-gray-600">Stay focused with Pomodoro technique.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
  )
}

export default App



