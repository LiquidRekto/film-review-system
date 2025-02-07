import { FilmService } from "@/services/film.service";
import { Request, Response } from "express";

export class FilmController {
  private filmService: FilmService;

  constructor() {
    this.filmService = new FilmService();
  }

  async getFilmById(req: Request, res: Response) {
    try {
      const film_id = parseInt(req.params.id);
      if (isNaN(film_id)) {
        return res.status(400).json({ error: "Invalid film ID" });
      }

      const film = await this.filmService.getFilmById(film_id);
      return res.json(film);
    } catch (error) {
      return res.status(404).json({ error: "Film not found" });
    }
  }
}
