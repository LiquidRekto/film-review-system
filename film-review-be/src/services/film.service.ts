import { API_R_404 } from "@/constants/res-codes";
import { APIError } from "@/interfaces/response";
import { Film } from "@/models/film";
import { FilmRepository } from "@/repository/film.repository";

export class FilmService {
  private filmRepository: FilmRepository;

  constructor() {
    this.filmRepository = new FilmRepository();
  }

  async createFilm(data: Partial<Film>): Promise<Film> {
    return this.filmRepository.createFilm(data);
  }

  async getFilmById(film_id: number): Promise<Film | null> {
    const film = this.filmRepository.getFilmById(film_id);
    console.log(film);
    if (!film) {
      throw new APIError("Film not found!", API_R_404);
    }

    return film;
  }

  //   async getFilmByEmail(email: string): Promise<Film | null> {
  //     return await Film.findOne({ where: { email } });
  //   }

  async updateFilm(film_id: number, data: Partial<Film>): Promise<void> {
    const film = this.filmRepository.getFilmById(film_id);

    if (!film) {
      throw new Error("Film not found!");
    }

    this.filmRepository.updateFilm(film_id, data);
  }

  async deleteFilm(film_id: number): Promise<void> {
    const film = this.filmRepository.getFilmById(film_id);

    if (!film) {
      throw new Error("Film not found!");
    }

    this.filmRepository.deleteFilm(film_id);
  }
}

export default new FilmService();
