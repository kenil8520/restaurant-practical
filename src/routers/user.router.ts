import express from 'express'
import { userRegistration, userLogin,forgotPassword, resetPassword } from '../controllers/user.controller'
import { userRegistrationValidation, emailValidation } from '../middleware/validator.middleware'
import { validateError } from '../middleware/error.middleware'
import verifyToken from '../middleware/auth.middleware'

const router = express.Router();

router.post('/register', userRegistrationValidation, validateError, userRegistration);

router.post('/login', emailValidation, validateError, userLogin);

router.post('/forgot-password', emailValidation, validateError, forgotPassword);

router.post('/reset-password', verifyToken, resetPassword);

export default router;
