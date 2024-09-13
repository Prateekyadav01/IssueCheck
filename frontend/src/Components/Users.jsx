import { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const Modal = ({ isOpen, onClose, onSubmit, editForm, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              id="id"
              name="_id"
              value={editForm._id}
              onChange={onChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              readOnly
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editForm.name}
              onChange={onChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editForm.email}
              onChange={onChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={editForm.role}
              onChange={onChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            >
              <option value="general">General</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    _id: '',
    name: '',
    email: '',
    role: 'general',
  });
console.log(editForm)
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/allUser', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ _id: user._id, name: user.name, email: user.email, role: user.role });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:4000/api/usersUpdate", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editForm),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status} - ${errorData.message}`);
        }
        
        await fetchUsers(); // Refresh the user list
        setEditingUser(null); // Hide the edit form
    } catch (error) {
        console.error('Error updating user data:', error.message); // Log the exact error message
        setError(`Failed to update user data: ${error.message}`);
    }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Users</h1>
      <p>Manage your users here. You can view, edit, or delete user accounts.</p>
      <div className="mt-4 overflow-x-auto">
        {users.length > 0 ? (
          <>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Role</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{user._id}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => handleEditClick(user)}
                      >
                        <MdEdit />
                      </button>
                      <button className="text-red-500 hover:underline ml-4">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Modal
              isOpen={!!editingUser}
              onClose={() => setEditingUser(null)}
              onSubmit={handleEditSubmit}
              editForm={editForm}
              onChange={handleEditChange}
            />
          </>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;
