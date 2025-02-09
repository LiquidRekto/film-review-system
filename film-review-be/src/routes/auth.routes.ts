import { AuthController } from "@/controllers/auth.controller";
import express, { Request, Response } from "express";

const router = express.Router();
const authController = new AuthController();

router.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});
router.post("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

export default router;
