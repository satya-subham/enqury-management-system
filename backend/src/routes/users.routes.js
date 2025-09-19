import express from 'express';
import { deleteUser, getAllUsers, updateUser } from '../controllers/users.controller.js';
import { register } from '../controllers/auth.controller.js';

const usersRoutes = express.Router();

usersRoutes.get('/', getAllUsers);
usersRoutes.post('/', register);
usersRoutes.put('/:id', updateUser);
usersRoutes.delete('/:id', deleteUser)

export default usersRoutes;