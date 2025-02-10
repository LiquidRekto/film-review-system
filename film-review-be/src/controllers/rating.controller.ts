import { API_R_200, API_R_400 } from "@/constants/res-codes";
import { IRecordFilter } from "@/interfaces/pagination";
import { APIError, APIResponse } from "@/interfaces/response";
import { Rating } from "@/models/rating";
import RatingService from "@/services/rating.service";
import { handleError } from "@/utils/err-handler";
import { Request, Response } from "express";

export class RatingController {
  private ratingService: RatingService;

  constructor() {
    this.ratingService = new RatingService();
  }

  async createRating(req: Request, res: Response) {
    try {
      const { user_id, film_id, rating_score, comment } = req.body;
      const dat: Partial<Rating> = {
        user_id: user_id,
        film_id: film_id,
        rating_score: rating_score,
        comment: comment,
      };
      const result = await this.ratingService.createRating(dat);
      res
        .status(API_R_200)
        .json(new APIResponse("Rating created successfully", result));
    } catch (e) {
      handleError(res, e);
    }
  }

  async getAllRatings(req: Request, res: Response) {
    const { offset, limit, order, orderBy, searchQuery, searchBy } = req.query;
    try {
      const filters: IRecordFilter = {
        offset: Number(offset),
        limit: Number(limit),
        order: order?.toString(),
        orderBy: orderBy?.toString(),
        searchQuery: searchQuery?.toString(),
        searchBy: searchBy?.toString(),
      };
      const filmRecords = await this.ratingService.getAllRatings(filters);
      return res.status(API_R_200).json(filmRecords);
    } catch (e) {
      handleError(res, e);
    }
  }

  async getRatingsOfFilmAndUser(req: Request, res: Response) {
    const { offset, limit, order, orderBy, searchQuery, searchBy, user_id } =
      req.query;
    const { film_id } = req.params;
    try {
      const filters: IRecordFilter = {
        offset: Number(offset),
        limit: Number(limit),
        order: order?.toString(),
        orderBy: orderBy?.toString(),
        searchQuery: searchQuery?.toString(),
        searchBy: searchBy?.toString(),
      };
      const filmRecords = await this.ratingService.getRatingsByFilmAndUser(
        Number(film_id),
        Number(user_id),
        filters
      );
      return res.status(API_R_200).json(filmRecords);
    } catch (e) {
      handleError(res, e);
    }
  }

  async deleteRating(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (isNaN(Number(id))) {
        throw new APIError("id is not a number", API_R_400);
      }

      await this.ratingService.deleteRating(Number(id));
      return res
        .status(API_R_200)
        .json(new APIResponse("rating deleted successfully"));
    } catch (e) {
      handleError(res, e);
    }
  }
}
