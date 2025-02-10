import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
import { Film } from "@/models/film";
import { Rating } from "@/models/rating";
import { col, FindOptions, fn, Op } from "sequelize";

export class FilmRepository {
  async createFilm(data: Partial<Film>): Promise<Film> {
    return await Film.create(data);
  }

  async getAllFilms(filter: IRecordFilter | null): Promise<IPageRecords<Film>> {
    let filterQuery = {};
    if (filter) {
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
    }

    const totalCount = await Film.count(
      filter
        ? {
            where: filterQuery,
          }
        : {}
    );

    let options: FindOptions<any> | undefined;

    if (filter) {
      options = {
        limit: filter.limit,
        offset: filter.offset,
        order: [[filter.orderBy!, filter.order!]],
        where: filterQuery,
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
      };
    } else {
      options = {
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
      };
    }

    const rows = await Film.findAll(options);

    return {
      totalItems: totalCount,
      totalPages: filter ? Math.ceil(totalCount / filter.limit!) : 0,
      currentPage: filter ? filter.offset! : 0,
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
