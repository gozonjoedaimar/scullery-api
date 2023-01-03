"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Route GET /api/inventory/kitchen
router.get('/', function (req, res) {
    throw new Error('Error here~~~~');
    res.json({ api: "Kitchen" });
});
const Kitchen = router;
exports.default = Kitchen;
