import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

export const validateError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages: string[] = errors.array().map((error: ValidationError) => error.msg);
        return res.status(400).json({ success: false, message: errorMessages[0] });
    }
    next();
};

