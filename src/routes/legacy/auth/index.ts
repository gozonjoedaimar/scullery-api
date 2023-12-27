import { Router, Request, Response } from "express";
import { login, logout } from '../../controllers/auth';

const router = Router();

// Route POST /auth/login
router.post('/login', login)

// Route POST /auth/logout
router.post('/logout', logout)

const Auth = router;

export default Auth;