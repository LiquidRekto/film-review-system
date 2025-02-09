import { API_R_200, API_R_400, API_R_404 } from "@/constants/res-codes";
import { IRecordFilter } from "@/interfaces/pagination";
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
    const { offset, limit, order, orderBy, searchQuery, searchBy } = req.query;
    console.log("REQPARAMS");
    console.log(req.query);
    try {
      const filters: IRecordFilter = {
        offset: Number(offset),
        limit: Number(limit),
        order: order?.toString(),
        orderBy: orderBy?.toString(),
        searchQuery: searchQuery?.toString(),
        searchBy: searchBy?.toString(),
      };
      const filmRecords = await this.filmService.getAllFilms(filters);
      return res.status(API_R_200).json(filmRecords);
    } catch (e) {
      handleError(res, e);
    }
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
