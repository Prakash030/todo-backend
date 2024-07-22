import bcrypt from 'bcryptjs';
import { User } from '../modals/UserModal.js'; // Ensure the path is correct

export const register = async (name, email, password) => {
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new Error("User already exists");
        }

        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 12),
        });

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const login = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        return user;
    } catch (error) {
        throw new Error(error.message);        
    }
}