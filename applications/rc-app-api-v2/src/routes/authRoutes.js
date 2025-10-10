import express from "express"
import { authController } from "../controllers/authController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/update-data", authenticateToken, authController.updateData)
router.put("/update-password", authenticateToken, authController.updatePassword)
router.put("/update-live-url", authenticateToken, authController.updateLiveUrl)
router.get("/profile", authenticateToken, authController.getProfile)

export default router
