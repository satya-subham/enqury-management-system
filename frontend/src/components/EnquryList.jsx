import axios from "axios";
import { axiosInstance } from "../lib/axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import EditEnquiryModal from "./EditEnquryModal";
import AssignEnquiryModal from "./AssignEnquryModal";

function EnquiryList({ enquiries, refresh, statusFilter, setStatusFilter }) {
  const { user, setEnquiries } = useContext(AuthContext);

  const handleDelete = async (id) => {
    const res = await axiosInstance.delete(`/inquries/${id}`);
    toast.success(res.data.message || "Enquiry deleted successfully");
    refresh();
  };

  const canModify = (enquiry) => {
    if (!user) return false;
    return (
      enquiry.customerName?.toLowerCase() === user.name?.toLowerCase() ||
      user.role !== "admin"
    );
  };

  return (
    <div>
      {enquiries.map((e) => (
        <div key={e._id} className="border p-4 mb-2 rounded">
          <h2 className="font-bold">Name: {e.customerName}</h2>
          <p>
            Contact: {e.email} | {e.phone}
          </p>
          <p>Message: {e.message}</p>
          <p>Status: {e.status}</p>
          <p>Assigned To: {e.assignedTo}</p>
          <button
            onClick={() => handleDelete(e._id)}
            className="bg-red-500 text-white px-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={!canModify(e)}
          >
            DELETE
          </button>
          {canModify(e) ? (
            <EditEnquiryModal enquiry={e} refresh={refresh} />
          ) : (
            <button
              className="bg-red-500 text-white px-2 rounded ml-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={!canModify(e)}
            >
              EDIT
            </button>
          )}

          {e.status !== "Completed" && user.role === "admin" ? (
            <AssignEnquiryModal enquiry={e} refresh={refresh} />
          ) : (
            <button
              className="bg-gray-400 text-white px-2 rounded ml-2 disabled:opacity-50 cursor-not-allowed"
              disabled
            >
              ASSIGN
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default EnquiryList;
