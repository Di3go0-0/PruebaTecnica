import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
    res.json({ message: "Login page" });
    });

router.post("/register", (req, res) => {
    res.json({ message: "Register page" });
    });

router.post("/logout", (req, res) => {
    res.json({ message: "Logout page" });
    });

export default router;