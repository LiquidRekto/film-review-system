import {
  API_ACCOUNT_LOG_IN,
  API_ACCOUNT_REGISTER,
  API_ENV,
  API_FILM_GET,
} from "@/constants/api-endpoints";
import { IAccountLogin, IAccountRegister } from "@/interfaces/auth";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";

export class FilmService extends BaseService {
  static async getFilmById(id: number) {
    try {
      const response = await this.request({ auth: false }).get(
        API_ENV.MAIN + `${API_FILM_GET}/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}
