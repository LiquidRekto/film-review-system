import { API_R_200, API_R_400, API_R_404 } from "@/constants/res-codes";
import { IRecordFilter } from "@/interfaces/pagination";
import { APIError, APIResponse } from "@/interfaces/response";
import { Film } from "@/models/film";
import { FilmService } from "@/services/film.service";
import { handleError } from "@/utils/err-handler";
import { Request, Response } from "express";

export class FilmController {
  private filmService: FilmService;

  constructor() {
    this.filmService = new FilmService();
  }

  async createFilm(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file) {
        throw new APIError("Please upload a file", API_R_400);
      }
      const filePath = "/api/uploads/" + file.filename;
      const { title, description, director } = req.body;
      const filmData: Partial<Film> = {
        title: title,
        description: description,
        director: director,
        thumbnail_path: filePath,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await this.filmService.createFilm(filmData);
      return res
        .status(API_R_200)
        .json(new APIResponse("Film created successfully", result));
    } catch (e) {
      handleError(res, e);
    }
  }

  async updateFilm(req: Request, res: Response) {
    try {
      const file = req.file;
      const { id } = req.params;
      if (isNaN(Number(id))) {
        throw new APIError("Invalid film id", API_R_400);
      }
      let filePath;
      if (file) {
        filePath = "/api/uploads/" + file.filename;
      }
      const { title, description, director } = req.body;
      const filmData: Partial<Film> = {
        title: title,
        description: description,
        director: director,
        updatedAt: new Date(),
      };
      if (file) filmData.thumbnail_path = filePath;
      const result = await this.filmService.updateFilm(Number(id), filmData);
      return res
        .status(API_R_200)
        .json(new APIResponse("Film created successfully", result));
    } catch (e) {
      handleError(res, e);
    }
  }

  async getAllFilms(req: Request, res: Response) {
    const { offset, limit, order, orderBy, searchQuery, searchBy } = req.query;
    try {
      const filters: IRecordFilter | null =
        offset || limit || order || orderBy || searchQuery || searchBy
          ? {
              offset: Number(offset),
              limit: Number(limit),
              order: order?.toString(),
              orderBy: orderBy?.toString(),
              searchQuery: searchQuery?.toString(),
              searchBy: searchBy?.toString(),
            }
          : null;
      const filmRecords = await this.filmService.getAllFilms(filters!);
      return res.status(API_R_200).json(filmRecords);
    } catch (e) {
      handleError(res, e);
    }
  }

  async getFilmById(req: Request, res: Response) {
    try {
      const film_id = parseInt(req.params.id);
      if (isNaN(film_id)) {
        throw new APIError("Invalid film id", API_R_404);
      }

      const film = await this.filmService.getFilmById(film_id);
      return res.status(API_R_200).json(film);
    } catch (e) {
      handleError(res, e);
    }
  }

  async deleteFilm(req: Request, res: Response) {
    try {
      const film_id = parseInt(req.params.id);
      if (isNaN(film_id)) {
        throw new APIError("Invalid film id", API_R_404);
      }

      await this.filmService.deleteFilm(film_id);
      return res
        .status(API_R_200)
        .json(new APIResponse("Film deleted successfully"));
    } catch (e) {
      handleError(res, e);
    }
  }
}
