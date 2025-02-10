import { AxiosError } from "axios";
import { BaseService } from "./base.service";
import {
  API_ENV,
  API_RATING_CREATE,
  API_RATING_DELETE,
  API_RATING_GET,
  API_RATING_GET_BY_FILM,
} from "@/constants/api-endpoints";
import { IRatingSubmit } from "@/interfaces/rating";

export class RatingService extends BaseService {
  static async createRating(data: IRatingSubmit) {
    try {
      const response = await this.request({ auth: true }).post(
        API_ENV.MAIN + API_RATING_CREATE,
        data
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async getAllRatings(filters) {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + API_RATING_GET,
        { params: filters }
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async getRatingsByFilm(id: number, filters) {
    try {
      const response = await this.request({ auth: false }).get(
        API_ENV.MAIN + `${API_RATING_GET_BY_FILM}/${id}`,
        { params: filters }
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async deleteRating(id: number) {
    try {
      const response = await this.request({ auth: true }).delete(
        API_ENV.MAIN + `${API_RATING_DELETE}/${id}`
      );
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}
