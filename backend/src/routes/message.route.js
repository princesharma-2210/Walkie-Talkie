import express from "express"
import { protectRoute } from "../middleware/auth.middleware";

const router= express.Router();
router.get("/user",protectRoute,getUsersForSidebar)

export default router;