import { Router, Request, Response } from "express";

const router = Router();

router.get('/', function(req: Request, res: Response) {
  res.json({api: "Kitchen"});
})

const Kitchen = router;

export default Kitchen;