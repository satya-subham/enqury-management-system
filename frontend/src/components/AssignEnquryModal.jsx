import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

function AssignEnquiryModal({ enquiry, refresh }) {
  const [assignedTo, setAssignedTo] = useState(enquiry.assignedTo || "");

  const handleAssign = async () => {
    try {
      await axiosInstance.put(`/inquries/${enquiry._id}`, {
        assignedTo,
      });
      toast.success("Enquiry assigned successfully");
      refresh();
    } catch (error) {
      toast.error("Failed to assign enquiry");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-gray-400 text-white px-2 rounded ml-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          ASSIGN
        </button>
      </Dialog.Trigger>

      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-140" />

      <Dialog.Content className="fixed bg-gray-800 p-6 rounded shadow-md max-w-md w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-150">
        <h2 className="text-xl font-bold mb-4">Assign Enquiry</h2>
        <p className="mb-2">Customer: {enquiry.customerName}</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Assign to (Staff Name)"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {/* Later you can replace input with a <select> of staff users */}
          
          <button
            onClick={handleAssign}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Assign
          </button>
          <Dialog.Close asChild>
            <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
              Cancel
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AssignEnquiryModal;
