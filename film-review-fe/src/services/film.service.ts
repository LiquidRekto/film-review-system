import {
  API_ACCOUNT_LOG_IN,
  API_ACCOUNT_REGISTER,
  API_ENV,
  API_FILM_CREATE,
  API_FILM_DELETE,
  API_FILM_GET,
  API_FILM_GET_ONE,
  API_FILM_UPDATE,
} from "@/constants/api-endpoints";
import { IAccountLogin, IAccountRegister } from "@/interfaces/auth";
import { IRecordFilter } from "@/interfaces/pagination";
import { BaseService } from "@/services/base.service";
import { AxiosError } from "axios";

export class FilmService extends BaseService {
  static async createFilm(data: FormData) {
    try {
      const response = await this.request(
        { auth: true },
        "multipart/form-data"
      ).post(API_ENV.MAIN + API_FILM_CREATE, data);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async updateFilm(film_id: number, data: FormData) {
    try {
      const response = await this.request(
        { auth: true },
        "multipart/form-data"
      ).put(API_ENV.MAIN + `${API_FILM_UPDATE}/${film_id}`, data);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

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

  static async getAllFims(filters?: IRecordFilter) {
    try {
      const response = await this.request({ auth: false }).get(
        API_ENV.MAIN + API_FILM_GET,
        {
          params: filters
            ? {
                offset: filters.offset || "",
                limit: filters.limit || "",
                order: filters.order || "",
                orderBy: filters.orderBy || "",
                searchQuery: filters.searchQuery || "",
                searchBy: filters.searchBy || "",
              }
            : null,
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
