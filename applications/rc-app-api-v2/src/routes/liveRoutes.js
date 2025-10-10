import express from "express"
import { LiveController } from "../controllers/liveController.js"

const router = express.Router()

router.get("/", LiveController.getLive)

export default router
