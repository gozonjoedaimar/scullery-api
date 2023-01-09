import { Router, Request, Response } from "express";

const router = Router();

// Route POST /auth/login
router.post('/login', function(req: Request, res: Response) {
  res.json({api: "Login"});
})

// Route POST /auth/logout
router.post('/logout', function(req: Request, res: Response) {
  res.json({api: "Logout"});
})

const Auth = router;

export default Auth;