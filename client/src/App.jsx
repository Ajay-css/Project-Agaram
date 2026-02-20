import React, { useEffect } from "react";
import GetStarted from "./pages/GetStarted";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InterviewSession from "./pages/InterviewSession";
import Result from "./pages/Result";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

const App = () => {

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND + "/api/health")
      .then(() => console.log("Server Warmed"))
      .catch(() => console.log("Server sleeping"));
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<GetStarted />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview/:id" element={<InterviewSession />} />
        <Route path="/result/:id" element={<Result />} />
      </Route>
    </Routes>
  );
};

export default App;