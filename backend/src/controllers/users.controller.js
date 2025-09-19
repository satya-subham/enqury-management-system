import User from "../models/user.model.js";

export async function addUser(req, res) {
    const { email, password, name, role } = req.body;

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


        res.status(201).json({ success: true, user: newUser });

    } catch (error) {
        console.log("Error in signup controller");
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({success: true, users});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        console.log(id)

        const deletedUser = await User.findByIdAndDelete(id).select('-password');

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}