import { IAccountLogin } from "@/interfaces/auth";
import { BaseResponse } from "@/interfaces/response";
import { AuthService } from "@/services/auth.service";
import { handleError } from "@/utils/err-handler";
import { Request, Response } from "express";

export class AuthController {
  private filmService: AuthService;

  constructor() {
    this.filmService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<BaseResponse> {
    try {
      const data = req.body as IAccountLogin;
      this.filmService.();
    } catch (e) {
      handleError(res, e)
    }
  }

  async register(req: Request, res: Response) {}
}
