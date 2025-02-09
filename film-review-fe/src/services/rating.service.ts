import { AxiosError } from "axios";
import { BaseService } from "./base.service";
import {
  API_ENV,
  API_RATING_DELETE,
  API_RATING_GET,
  API_RATING_GET_BY_FILM,
} from "@/constants/api-endpoints";

export class RatingService extends BaseService {
  static async getAllRatings() {
    try {
      const response = await this.request({ auth: true }).get(
        API_ENV.MAIN + API_RATING_GET
      );
      console.log(response);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }

  static async getRatingsByFilm(id: number) {
    try {
      const response = await this.request({ auth: false }).get(
        API_ENV.MAIN + `${API_RATING_GET_BY_FILM}/${id}`
      );
      console.log(response);
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
      console.log(response);
      return response;
    } catch (error) {
      return (error as AxiosError).response;
    }
  }
}
