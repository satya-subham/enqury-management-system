import { useState, useEffect, useContext } from "react";
import axios from "axios";
import EnquiryList from "./EnquryList";
import { Tabs } from "@radix-ui/react-tabs";
import EnquiryForm from "./EnquryForm";
import NavBar from "./NavBar";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from 'react-router-dom'

function Dashboard({ onSuccess, enquiries }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { user, setEnquiries, filteredProduct, setFilteredProduct } = useContext(AuthContext);

  useEffect(() => {
    onSuccess();
  }, []);

  useEffect(() => {
    let filtered = enquiries.filter((e) => e.status === statusFilter);
    if (statusFilter === "All") {
      filtered = enquiries;
    }
    setFilteredProduct(filtered);
  }, [statusFilter]);


  useEffect(() => {
    let filtered = enquiries.filter((e) => e.customerName.toLowerCase() === searchQuery.toLowerCase());
    if (searchQuery === "") {
      filtered = enquiries;
    }
    setFilteredProduct(filtered);
  }, [searchQuery]);

  return (
    <div className="p-4 max-w-6xl mx-auto text-white">
      <NavBar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      <input
        type="text"
        placeholder="Search by customer name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full mb-4 outline-none"
      />

      <EnquiryForm onSuccess={onSuccess}/>
      <NavLink to="/users">
        {user?.role !== "user" && <button className="bg-blue-600 text-white px-4 py-2 ml-2 rounded mb-4 mt-4 cursor-pointer">User Management</button>}
      </NavLink>
      <EnquiryList enquiries={filteredProduct} refresh={onSuccess} statusFilter={statusFilter} setStatusFilter={setStatusFilter} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    </div>
  );
}

export default Dashboard;
