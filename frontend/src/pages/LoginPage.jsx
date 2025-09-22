import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import * as Dialog from '@radix-ui/react-dialog';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axiosInstance.post('/auth/login', { email, password });
    if(!res.data){
      toast.error('Login failed. Please check your credentials.');
      return;
    }
    toast.success('Login successful');
    return navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Dialog.Root open={true}>
        <Dialog.Content className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">LOGIN</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">LOGIN</button>
            <NavLink to="/register" className="bg-blue-600 text-white px-4 py-2 rounded"><button type="button" >REGISTER</button></NavLink>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}

export default Login;
