import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export async function register (req, res) {
    const { email, password, name, role} = req.body;

    try {
        if(!email || !password || !name){
            return res.status(400).json({ message: "All fields are required"});
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }


        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({ message: "Email already existed, please use a different one" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            name,
            password: hashedPassword,
            role: role || 'user'
        });


        const token = jwt.sign({userId: newUser._id, role: newUser.role}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });


        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.log("Error in signup controller");
        res.status(500).json({ message: "Internal server error" });
    }
};


export async function login (req, res) {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d'
        });

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({ success: true, user });

    } catch (error) {
        console.log("Error in login controller");
        res.status(500).json({ message: "Internal server error" });
    }
};

export function logout (req, res) {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successfully" });
};