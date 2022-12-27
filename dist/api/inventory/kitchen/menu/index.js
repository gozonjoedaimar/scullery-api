"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/:id', function (req, res) {
    let id = req.params.id;
    res.json({ api: "Kitchen Menu ID", id });
});
router.get('/', function (req, res) {
    res.json({ api: "Kitchen Menu" });
});
const KitchenMenu = router;
exports.default = KitchenMenu;
