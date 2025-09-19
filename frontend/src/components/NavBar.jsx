import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { LayoutDashboard } from "lucide-react";

function NavBar({ statusFilter, setStatusFilter }) {
  const { logout, userRole, setEnquiries, enquiries } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 pt-2 pb-4 text-white flex justify-between items-center sticky top-0 z-100">
      <div className="flex justify-center items-center">
        <Link to="/" className="mr-4">
          <LayoutDashboard size={30} />
        </Link>
        <h1 className="text-3xl font-bold">ENQUIRY DASHBOARD</h1>
        {userRole === "admin" && (
          <Link to="/users" className="mr-4">
            USER MANAGEMENT
          </Link>
        )}
      </div>
      <button className="bg-red-600 px-3 py-1 rounded cursor-pointer" onClick={() => setStatusFilter("All")}>
        ALL
      </button>
      <button className="bg-red-600 px-3 py-1 rounded cursor-pointer" onClick={() => setStatusFilter("Pending")}>
        PENDING
      </button>
      <button className="bg-red-600 px-3 py-1 rounded cursor-pointer" onClick={() => setStatusFilter("In Progress")}>
        IN PROGRESS
      </button>
      <button className="bg-red-600 px-3 py-1 rounded cursor-pointer" onClick={() => setStatusFilter("Completed")}>
        COMPLETED
      </button>
      <button
        onClick={logout}
        className="bg-red-600 px-3 py-1 rounded cursor-pointer"
      >
        LOGOUT
      </button>
    </nav>
  );
}

export default NavBar;
