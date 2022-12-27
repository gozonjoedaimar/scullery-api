import { Router, Request, Response } from "express";

const router = Router();

router.get('/:id', function(req: Request, res: Response) {
  let id = req.params.id;
  res.json({api: "Kitchen Menu ID", id});
})

router.get('/', function(req: Request, res: Response) {
  res.json({api: "Kitchen Menu"});
})

const KitchenMenu = router;

export default KitchenMenu;