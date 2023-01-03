import { Router, Request, Response } from "express";

const router = Router();

// Route GET /api/inventory/stockroom
router.get('/', function(req: Request, res: Response) {
  res.json({api: "Stockroom"});
})

const Stockroom = router;

export default Stockroom;