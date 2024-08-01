import bcrypt from 'bcrypt';
import User from '../models/user.model';


export const createUserService = async (email: string, password: string) => {

    const hashedPassword = await bcrypt.hash(password,15);

    const user = await User.create({
        email: email,
        password: hashedPassword
    });
    return user
}

export const findUserByEmail = async (email: string) => {
    const user = await User.findOne({
        where: { email }
    });
    return user
}
