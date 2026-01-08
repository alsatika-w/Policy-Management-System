import bcrypt from 'bcryptjs';
import { createUser, findUserByUsername } from '../models/user-model.js';
import {jwtToken} from '../utils/jwt.js';


//Register
export const register = async (req, res) => {
    try {
        const {username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser (
            username, hashedPassword, role || 'user'
        );
        res.status(201).json(user);
    }
    catch (err) {
        if (err.code == '23505') {
            return res.status(404).json({
                message: 'Username already exists',
            });
        }
        res.status(500).json({error: err.message});
    }
};


//Login
export const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await findUserByUsername (username);
    if (!user) {
        res.status(401).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401).json({message: 'Invalid credentials'});
    }

    const token = jwtToken({
        id: user.id,
        role: user.role
    });

    res.json({token})
};