import { Film } from "@/models/film";

export class FilmRepository {
  async createFilm(data: Partial<Film>): Promise<Film> {
    return await Film.create(data);
  }

  async getFilmById(film_id: number): Promise<Film | null> {
    return await Film.findByPk(film_id);
  }

  //   async getFilmByEmail(email: string): Promise<Film | null> {
  //     return await Film.findOne({ where: { email } });
  //   }

  async updateFilm(film_id: number, data: Partial<Film>): Promise<void> {
    await Film.update(data, { where: { film_id } });
  }

  async deleteFilm(film_id: number): Promise<void> {
    await Film.destroy({ where: { film_id } });
  }
}

export default new FilmRepository();
