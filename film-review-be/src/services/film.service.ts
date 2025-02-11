import { API_R_404 } from "@/constants/res-codes";
import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
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

  async getAllFilms(
    filters: IRecordFilter | null
  ): Promise<IPageRecords<Film> | null> {
    const films = await this.filmRepository.getAllFilms(filters!);

    if (!films) {
      throw new APIError("Film not found!", API_R_404);
    }

    return films;
  }

  async getFilmById(film_id: number): Promise<Film | null> {
    const film = await this.filmRepository.getFilmById(film_id);
    if (!film) {
      throw new APIError("Film not found!", API_R_404);
    }

    return film;
  }

  //   async getFilmByEmail(email: string): Promise<Film | null> {
  //     return await Film.findOne({ where: { email } });
  //   }

  async updateFilm(film_id: number, data: Partial<Film>): Promise<void> {
    const film = await this.filmRepository.getFilmById(film_id);

    if (!film) {
      throw new Error("Film not found!");
    }

    await this.filmRepository.updateFilm(film_id, data);
  }

  async deleteFilm(film_id: number): Promise<void> {
    const film = await this.filmRepository.getFilmById(film_id);
    if (!film) {
      throw new APIError("Film not found!", API_R_404);
    }

    await this.filmRepository.deleteFilm(film_id);
  }
}

export default new FilmService();
