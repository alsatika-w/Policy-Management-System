import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = Router();

//Protected route
router.get("/", authMiddleware, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    };

      return res.status(200).json({
        message: `Welcome ${req.user.username}, you have access to admin policies.`,
        user: req.user
    });
});

export default router;