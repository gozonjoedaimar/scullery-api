import { Router } from "express";

const router = Router();

// get version
router.get('/', function(req, res) {
    res.json({"version":"v1"});
});

export default router;