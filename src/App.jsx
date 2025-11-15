import "@radix-ui/themes/styles.css";
import React from "react";
import "./index.css";
import { Button, Box, Flex, Grid, Section } from "@radix-ui/themes";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Timer from "./pages/timer";
import Notes from "./pages/notes";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
     <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-800">Productivity App</h1>
              <div className="flex gap-4 items-center">
                {isAuthenticated ? (
                  <>
                    <span className="text-sm text-gray-600">Welcome, {user?.username}!</span>
                    <Link to="/" className="btn hover:text-blue-600">Home</Link>
                    <Link to="/notes" className="btn hover:text-blue-600">Notes</Link>
                    <Link to="/tasks" className="btn hover:text-blue-600">Tasks</Link>
                    <Link to="/timer" className="btn hover:text-blue-600">Timer</Link>
                    <button 
                      onClick={logout}
                      className="btn hover:text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn hover:text-blue-600">Login</Link>
                    <Link to="/register" className="btn hover:text-blue-600">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="container-custom py-8">
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <Register />} />
            <Route 
              path="/notes" 
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/timer" 
              element={
                <ProtectedRoute>
                  <Timer />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={
              isAuthenticated ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Notes</h2>
                    <p className="text-gray-600">Keep track of your important thoughts and ideas.</p>
                    <Link to="/notes" className="mt-4 inline-block text-blue-600 hover:text-blue-800">View Notes →</Link>
                  </div>
                  <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                    <p className="text-gray-600">Manage your daily tasks and stay organized.</p>
                    <Link to="/tasks" className="mt-4 inline-block text-blue-600 hover:text-blue-800">View Tasks →</Link>
                  </div>
                  <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Timer</h2>
                    <p className="text-gray-600">Stay focused with Pomodoro technique.</p>
                    <Link to="/timer" className="mt-4 inline-block text-blue-600 hover:text-blue-800">Start Timer →</Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Productivity App</h2>
                  <p className="text-gray-600 mb-8">Please login or register to get started</p>
                  <div className="flex gap-4 justify-center">
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                      Login
                    </Link>
                    <Link to="/register" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                      Register
                    </Link>
                  </div>
                </div>
              )
            } />
          </Routes>
        </main>
      </div>
  )
}

export default App



