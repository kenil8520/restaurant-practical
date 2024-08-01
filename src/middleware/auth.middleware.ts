import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export interface IRequest extends Request {
    user?: object;
}

const verifyToken = (req: IRequest, res: Response, next: NextFunction) =>{
    try {
        let token: string | undefined;
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Authentication token missing' });
        }

        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Unauthorized user' });
                }
                req.user = decoded.user;
                next();
            });
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'User not authorized or token is missing' });
        }
    } catch (error) {
        console.log(error);
    }
}

export default verifyToken;
