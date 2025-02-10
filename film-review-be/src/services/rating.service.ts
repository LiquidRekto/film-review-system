import { API_R_404 } from "@/constants/res-codes";
import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
import { APIError } from "@/interfaces/response";
import { Rating } from "@/models/rating";
import { RatingRepository } from "@/repository/rating.repository";

export class RatingService {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();
  }

  async createRating(data: Partial<Rating>): Promise<Rating> {
    return this.ratingRepository.createRating(data);
  }

  async getAllRatings(
    filters: IRecordFilter
  ): Promise<IPageRecords<Rating> | null> {
    const ratings = await this.ratingRepository.getAllRatings(filters);
    return ratings;
  }

  async getRatingsByFilmAndUser(
    film_id: number,
    user_id: number,
    filters: IRecordFilter
  ): Promise<IPageRecords<Rating> | null> {
    const ratings = await this.ratingRepository.getRatingByFilmAndUser(
      film_id,
      user_id,
      filters
    );
    return ratings;
  }

  async deleteRating(id: number) {
    const r = await this.ratingRepository.getRatingById(id);
    console.log(r);
    if (!r) {
      throw new APIError("Rating not found!", API_R_404);
    }

    await this.ratingRepository.deleteRating(id);
  }
}

export default RatingService;
