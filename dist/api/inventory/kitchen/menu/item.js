"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', function (req, res) {
    res.json({ api: "Menu Item" });
});
const MenuItem = router;
exports.default = MenuItem;
