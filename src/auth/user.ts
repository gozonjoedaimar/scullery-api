import { Router, Request, Response } from "express";

const router = Router();

// Route POST /auth/user
router.post('/', function(req: Request, res: Response) {
  res.json({api: "Create User"});
})

const User = router;

export default User;