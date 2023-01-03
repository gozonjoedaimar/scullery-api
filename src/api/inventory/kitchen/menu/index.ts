import { Router, Request, Response } from "express";

const router = Router();

// Route GET /api/inventory/kitchen/menu/:id
router.get('/:id', function(req: Request, res: Response) {
  let id = req.params.id;
  res.json({api: "Kitchen Menu ID", id});
})

// Route GET /api/inventory/kitchen/menu
router.get('/', function(req: Request, res: Response) {
  res.json({api: "Kitchen Menu"});
})

const KitchenMenu = router;

export default KitchenMenu;