import { User } from '../models/user.model.js';
import { generateToken } from './token.js';

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        // Process Google authentication logic here

        let user = await User.findOne({ email });
        if(!user){
            user = await User.create({name,email});
        }
        const token  = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: false,
            secure:true,
            sameSite:'none',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json({user});
    }
    catch(error){
        console.error('Error occurred during Google authentication:', error);
        res.status(500).json({ message: 'Internal server error' ,error:error.message});

    }

};


export const logOut = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: false,
            secure: true,
            sameSite: 'none',
        });
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error occurred during logout:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
