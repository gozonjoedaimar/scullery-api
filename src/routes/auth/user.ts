import { Router, Request, Response } from "express";
import user from '../../models/User';

const router = Router();

// Route POST /auth/user
router.post('/', function(req: Request, res: Response) {
  user.createUser(req.body.email, req.body.password);
  res.json({api: "Create User"});
})

const User = router;

export default User;