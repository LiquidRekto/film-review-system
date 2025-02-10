import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
import { Film } from "@/models/film";
import { Rating } from "@/models/rating";
import { col, fn, Op } from "sequelize";

export class FilmRepository {
  async createFilm(data: Partial<Film>): Promise<Film> {
    return await Film.create(data);
  }

  async getAllFilms(filter: IRecordFilter): Promise<IPageRecords<Film>> {
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

    const totalCount = await Film.count({
      //where: filterQuery, // Keep the same filters
    });

    const rows = await Film.findAll({
      //limit: filter.limit,
      //offset: filter.offset,
      //order: [[filter.orderBy!, filter.order!]],
      //where: filterQuery,
      attributes: [
        "id",
        "title",
        "description",
        "director",
        "thumbnail_path",
        [fn("AVG", col("Ratings.rating_score")), "avg_rating"], // AVG rating
      ],
      include: {
        model: Rating,
        attributes: [],
      },
      group: ["Film.id"], // Group by Film ID
      subQuery: false, // Avoid issues with MySQL's ONLY_FULL_GROUP_BY
    });

    return {
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / filter.limit!),
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
