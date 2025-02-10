import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
import { Film } from "@/models/film";
import { Op } from "sequelize";

export class FilmRepository {
  async createFilm(data: Partial<Film>): Promise<Film> {
    return await Film.create(data);
  }

  async getAllFilms(filter: IRecordFilter): Promise<IPageRecords<Film>> {
    console.log(filter);

    let filterQuery = {};

    switch (filter.searchBy) {
      case "title":
        filterQuery = { title: { [Op.like]: `%${filter.searchQuery}%` } };
        break;
      case "director":
        filterQuery = { director: { [Op.like]: `%${filter.searchQuery}%` } };
        break;
      default:
        filterQuery = {
          title: { [Op.like]: `%${filter.searchQuery ?? ""}%` },
          director: { [Op.like]: `%${filter.searchQuery ?? ""}%` },
        };
        break;
    }

    const { count, rows } = await Film.findAndCountAll({
      limit: filter.limit,
      offset: filter.offset,
      order: [[filter.orderBy!, filter.order!]],

      where: filterQuery,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / filter.limit!),
      currentPage: filter.offset!,
      records: rows,
    };
  }

  async getFilmById(film_id: number): Promise<Film | null> {
    return await Film.findByPk(film_id);
  }

  //   async getFilmByEmail(email: string): Promise<Film | null> {
  //     return await Film.findOne({ where: { email } });
  //   }

  async updateFilm(film_id: number, data: Partial<Film>): Promise<void> {
    await Film.update(data, { where: { id: film_id } });
  }

  async deleteFilm(film_id: number): Promise<void> {
    await Film.destroy({ where: { id: film_id } });
  }
}

export default new FilmRepository();
