import {
  API_ACCOUNT_LOG_IN,
  API_ACCOUNT_REGISTER,
  API_ENV,
  API_FILM_DELETE,
  API_FILM_GET,
  API_FILM_GET_ONE,
} from "@/constants/api-endpoints";
import { IAccountLogin, IAccountRegister } from "@/interfaces/auth";
import { IRecordFilter } from "@/interfaces/pagination";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";

export class FilmService extends BaseService {
  static async getFilmById(id: number) {
    try {
      const response = await this.request({ auth: false }).get(
        API_ENV.MAIN + `${API_FILM_GET_ONE}/${id}`
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async getAllFims(filters: IRecordFilter) {
    try {
      const response = await this.request({ auth: false }).get(
        API_ENV.MAIN + API_FILM_GET,
        {
          params: {
            offset: filters.offset || "",
            limit: filters.limit || "",
            order: filters.order || "",
            orderBy: filters.orderBy || "",
            searchQuery: filters.searchQuery || "",
            searchBy: filters.searchBy || "",
          },
        }
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async deleteFilm(id: number) {
    try {
      const response = await this.request({ auth: true }).delete(
        API_ENV.MAIN + `${API_FILM_DELETE}/${id}`
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}
