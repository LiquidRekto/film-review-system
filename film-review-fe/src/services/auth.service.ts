import {
  API_ACCOUNT_LOG_IN,
  API_ACCOUNT_REGISTER,
  API_ENV,
} from "@/constants/api-endpoints";
import { IAccountLogin, IAccountRegister } from "@/interfaces/auth";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";

export class AuthService extends BaseService {
  static async login(data: IAccountLogin) {
    try {
      const response = await this.request({ auth: false }).post(
        API_ENV.MAIN + API_ACCOUNT_LOG_IN,
        data
      );
      console.log(response);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async logout() {}

  static async register(data: IAccountRegister) {
    try {
      const response = await this.request({ auth: false }).post(
        API_ENV.MAIN + API_ACCOUNT_REGISTER,
        data
      );
      console.log(response);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}
