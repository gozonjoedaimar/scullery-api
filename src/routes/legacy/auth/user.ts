import { Router, Request, Response } from "express";
import { getUser } from "../../controllers/auth";

const router = Router();

// Route POST /auth/user
router.post('/', getUser)

const User = router;

export default User;