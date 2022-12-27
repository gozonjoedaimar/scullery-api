import { Router, Request, Response } from "express";

const router = Router();

router.get('/', function(req: Request, res: Response) {
  res.json({api: "Menu Item"});
})

const MenuItem = router;

export default MenuItem;