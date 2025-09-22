import { useState, useEffect } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { UserX } from "lucide-react";
import { NavLink } from "react-router-dom";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");

      if (res.data.users.length === 0) {
        toast.info("No users found. Please add some users.");
        return;
      }
      setUsers(res.data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
    }
  };

  const handleAddUser = async () => {
    try {
      await axiosInstance.post("/users", formData);
      toast.success("User created");
      fetchUsers();
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/users/${id}`);
    toast.success("User deleted");
    fetchUsers();
  };

  const handleUpdate = async (id, updatedData) => {
    await axiosInstance.put(`/users/${id}`, updatedData);
    toast.success("User updated");
    fetchUsers();
  };

  const [editData, setEditData] = useState(null); // store user being edited
  const handleEditSubmit = async () => {
    try {
      await axiosInstance.put(`/users/${editData._id}`, editData);
      toast.success("User updated");
      setEditData(null); // close modal
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">USER MANAGEMENT</h1>
      <NavLink to="/"><button type="button" className="bg-green-600 text-white px-4 py-2 rounded">ENQUREY</button></NavLink>

      {/* Add User Form */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
            Add New User
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          {/* Dark background */}
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />

          {/* Modal box */}
          <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleAddUser}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Users Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4">name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => setEditData(user)}
                    className="bg-blue-500 text-white px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="flex items-center justify-center">
              <td>
                <UserX />
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {editData && (
        <Dialog.Root open={true} onOpenChange={() => setEditData(null)}>
          <Dialog.Portal>
            {/* Dark background */}
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />

            {/* Modal box */}
            <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <select
                  value={editData.role}
                  onChange={(e) =>
                    setEditData({ ...editData, role: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div className="flex justify-end gap-2">
                  <Dialog.Close asChild>
                    <button
                      onClick={() => setEditData(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    onClick={handleEditSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
}

export default UserManagement;
