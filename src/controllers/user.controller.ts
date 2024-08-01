import { Request, Response } from "express";
import {findUserByEmail,createUserService} from '../services/user.services'
import bcrypt from 'bcrypt';
import {generateTokens} from '../helpers/token'
import sendEmail from "../utils/sendEmail"
import { decodeToken } from "../helpers/token";


export const userRegistration = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userExists = await findUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ success: false, message: "Email is already associated with an account"});
        }
        const newUser = await createUserService(email, password);

        return res.status(200).json({success: true, message: "User registration successful", data: newUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message:"Internal Server Error"})
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "No user found with this email" });
        }
        const userPassword = user?.password as string;
        const passwordValid = await bcrypt.compare(password, userPassword);
        if (!passwordValid) {
            return res.status(401).json({ success: false, message: "Incorrect email or password" });
        }
        const { accessToken, refreshToken } = generateTokens(user as any);
        const data = { email: user.email, accessToken, refreshToken };

        return res.status(200).json({ success: true, data: data, message: "Login successfully" });
    } catch (err: any) {
        console.log(err);
        return res.status(500).json({ success: false, message: "Error in sign in" });
    }
}

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ success: false, message: "No user found with this email" });
        }

        const resetToken = generateTokens(user as any);
        await sendEmail({
            to: user.email as string,
            subject: 'Password Reset',
            text: `this is the token to reset password \n${resetToken.accessToken}`,
        });
        return res.status(200).json({success: true, message: "Reset link sent on your email id."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: true,  message: "Internal Server Error"})
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(404).json({ success: false, message: 'Confirm password does not match new password'});
        }
        const authtoken:any = req.headers.authorization;
        const token:any = await decodeToken(authtoken);
        const userId = token['user'] as any;
        const user = await findUserByEmail(userId.email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

