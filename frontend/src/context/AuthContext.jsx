import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [enquiries, setEnquiries] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const logout = async () => {
    try {
      axiosInstance.post("/auth/logout");
      setUser("");
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  }

  const getAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      toast.error("Session expired. Please log in again.");
    }
  };

  const fetchEnquiries = async () => {
    try {
      const res = await axiosInstance.get("/inquries");
      if (res.data.length === 0) {
        toast.info("No enquiries found. Please add some enquiries.");
        return;
      }
      setEnquiries(res.data);
      setFilteredProduct(res.data);
    } catch (error) {
      toast.error("Failed to fetch enquiries. Please try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ getAuth, user, fetchEnquiries, enquiries, setEnquiries, filteredProduct, setFilteredProduct, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
