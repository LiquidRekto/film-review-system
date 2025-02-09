import { AuthController } from "@/controllers/auth.controller";
import express, { Request, Response } from "express";

const router = express.Router();
const authController = new AuthController();

router.get("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});
router.get("/register", (req: Request, res: Response) => {
  authController.register(req, res);
});

export default router;
