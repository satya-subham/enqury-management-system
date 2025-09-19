import { useContext, useState } from "react";
import { toast } from "react-toastify";
import * as Dialog from "@radix-ui/react-dialog";
import { axiosInstance } from "../lib/axios";
import { PlusIcon, X } from "lucide-react";

function EnquiryForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    message: "",
    assignedTo: "",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.email || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    await axiosInstance.post("/inquries", formData);
    toast.success("Enquiry added successfully");
    onSuccess();
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      message: "",
      assignedTo: "",
      status: "Pending",
    });
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 cursor-pointer">
            Add Enquiry
            <PlusIcon className="inline-block ml-2" size={16} />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          {/* Dark background */}
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-140" />

          {/* Modal content */}
          <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-150">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Add Enquiry</h2>
              <Dialog.Close asChild>
                <button className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Assigned To"
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default EnquiryForm;
