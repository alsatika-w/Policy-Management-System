import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

//Protected route
router.get("/", authMiddleware, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    };
});

export default router;