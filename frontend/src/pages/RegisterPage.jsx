import { useState } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate, NavLink } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Dialog.Root open={true}>
        <Dialog.Content className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">CREATE AN ACCOUNT</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full p-2 border rounded" required />
            <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full p-2 border rounded" required />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">CREATE</button>
            <NavLink to="/login" className="bg-blue-600 text-white px-4 py-2 rounded"><button type="button" >LOGIN</button></NavLink>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default Register;
