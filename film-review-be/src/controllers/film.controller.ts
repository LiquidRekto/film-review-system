import { API_R_200, API_R_400, API_R_404 } from "@/constants/res-codes";
import { APIError } from "@/interfaces/response";
import { FilmService } from "@/services/film.service";
import { handleError } from "@/utils/err-handler";
import { Request, Response } from "express";

export class FilmController {
  private filmService: FilmService;

  constructor() {
    this.filmService = new FilmService();
  }

  async getAllFilms(req: Request, res: Response) {
    const { offset, limit } = req.params;
  }

  async getFilmById(req: Request, res: Response) {
    try {
      const film_id = parseInt(req.params.id);
      if (isNaN(film_id)) {
        throw new APIError("Film not found", API_R_404);
      }

      const film = await this.filmService.getFilmById(film_id);
      return res.status(API_R_200).json(film);
    } catch (e) {
      handleError(res, e);
    }
  }
}
