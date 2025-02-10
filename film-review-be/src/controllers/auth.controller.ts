import { API_R_200, API_R_400 } from "@/constants/res-codes";
import { IAccountLogin, IAccountRegister } from "@/interfaces/auth";
import { APIError, APIResponse } from "@/interfaces/response";
import { AuthService } from "@/services/auth.service";
import { handleError } from "@/utils/err-handler";
import { hashPassword } from "@/utils/hashing";
import { Request, Response } from "express";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    try {
      const data = req.body as IAccountLogin;
      const result = await this.authService.login(data);

      if (!result) {
        throw new APIError("Incorrect username or password", API_R_400);
      }

      return res
        .status(API_R_200)
        .json(new APIResponse("Login successful", result));
    } catch (e) {
      handleError(res, e);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;
      const processedData: IAccountRegister = {
        username: data.username,
        first_name: data.firstName,
        last_name: data.lastName,
        dob: data.dob,
        phone_number: data.phoneNumber,
        email: data.email,
        password_hash: await hashPassword(data.password),
        role: "user",
      };

      const result = await this.authService.register(processedData);
      return res
        .status(API_R_200)
        .json(new APIResponse("Register successful", result));
    } catch (e) {
      handleError(res, e);
    }
  }
}
