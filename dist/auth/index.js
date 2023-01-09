"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Route POST /auth/login
router.post('/login', function (req, res) {
    res.json({ api: "Login" });
});
// Route POST /auth/logout
router.post('/logout', function (req, res) {
    res.json({ api: "Logout" });
});
const Auth = router;
exports.default = Auth;
