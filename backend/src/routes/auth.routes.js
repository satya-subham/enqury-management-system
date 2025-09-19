import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);

authRoutes.get('/me', protectRoute, (req, res) => {
    res.status(200).json({success: true, user: req.user});
})

export default authRoutes;