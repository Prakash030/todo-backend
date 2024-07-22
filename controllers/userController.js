import { register, login } from "../services/userService.js";
import jsonwebtoken from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await register(name, email, password);

        const token = jsonwebtoken.sign({ _id: user._id }, process.env.JSON_WEB_TOKEN_SECRET, {
            expiresIn: "7d",
        });

        return res.status(200).json({
            user: user,
            token: token,
            message: "User registered successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const user = await login(email, password);

        console.log(user);

        const token = jsonwebtoken.sign({ _id: user._id }, process.env.JSON_WEB_TOKEN_SECRET, {
            expiresIn: "7d",
        });

        return res.status(200).json({
            user: user,
            token: token,
            message: "Logged in successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}