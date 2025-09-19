import { useContext, useState } from "react";
import EnquiryForm from "./components/EnquryForm";
import EnquiryList from "./components/EnquryList";
import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

import { Theme } from "@radix-ui/themes";
import Dashboard from "./components/Dashboard";
import { toast, ToastContainer } from "react-toastify";
import UserManagement from "./pages/UserManagementPage";
import { AuthContext } from "./context/AuthContext";
import { axiosInstance } from "./lib/axios";

function App() {
  const { getAuth, user, fetchEnquiries, enquiries } = useContext(AuthContext);

  useEffect(() => {
    fetchEnquiries();
    getAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-800">
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Dashboard onSuccess={fetchEnquiries} enquiries={enquiries} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/users"
          element={user?.role !== "user" ? <UserManagement /> : <Navigate to="/" />}
        />

        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
