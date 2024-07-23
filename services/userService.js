import bcrypt from 'bcryptjs';
import { User } from '../modals/UserModal.js';
import axios from 'axios';

export const register = async (googleAccessToken, name, email, password) => {
    if (googleAccessToken) {
        try {
            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    "Authorization": `Bearer ${googleAccessToken}`
                }
            });

            const gname = response?.data?.name;
            const gemail = response?.data?.email;
            const picture = response?.data?.picture;

            const existingUser = await User.findOne({ email: gemail }).select("email");

            if (existingUser) {
                throw new Error("User already exists!");
            }

            const user = await User.create({ name: gname, email: gemail, profilePicture: picture });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
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
}


export const login = async (googleAccessToken, email, password) => {
    if (googleAccessToken) {
        try {
            const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { "Authorization": `Bearer ${googleAccessToken}` }
            });

            const gemail = response?.data?.email;

            const user = await User.findOne({ email: gemail });
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    } else {
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
}