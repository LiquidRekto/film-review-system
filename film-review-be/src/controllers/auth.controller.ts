import { AuthService } from "@/services/auth.service";
import { Request, Response } from "express";

export class AuthController {
  private filmService: AuthService;

  constructor() {
    this.filmService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {}

  async register(req: Request, res: Response) {}
}
