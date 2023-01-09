"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Route POST /auth/user
router.post('/', function (req, res) {
    res.json({ api: "Create User" });
});
const User = router;
exports.default = User;
