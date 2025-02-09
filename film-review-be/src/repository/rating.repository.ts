import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
import { Rating } from "@/models/rating";
import { Op } from "sequelize";

export class RatingRepository {
  async createRating(data: Partial<Rating>): Promise<Rating> {
    return await Rating.create(data);
  }

  async getAllRatings(filter: IRecordFilter): Promise<IPageRecords<Rating>> {
    let filterQuery = {
      title: {},
      director: {},
    };
    switch (filter.searchBy) {
      case "title":
        filterQuery.title = { [Op.like]: `%${filter.searchQuery}%` };
        break;
      case "director":
        filterQuery.director = { [Op.like]: `%${filter.searchQuery}%` };
        break;
      default:
        filterQuery = {
          title: { [Op.like]: `%${filter.searchQuery}%` },
          director: { [Op.like]: `%${filter.searchQuery}%` },
        };
        break;
    }
    const { count, rows } = await Rating.findAndCountAll({
      limit: filter.limit,
      offset: filter.offset,
      order: [[filter.orderBy, filter.order]],
      where: filterQuery,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / filter.limit),
      currentPage: filter.offset,
      records: rows,
    };
  }

  async getRatingById(film_id: number): Promise<Rating | null> {
    return await Rating.findByPk(film_id);
  }

  //   async getFilmByEmail(email: string): Promise<Film | null> {
  //     return await Film.findOne({ where: { email } });
  //   }

  async updateRating(id: number, data: Partial<Rating>): Promise<void> {
    await Rating.update(data, { where: { id } });
  }

  async deleteRating(id: number): Promise<void> {
    await Rating.destroy({ where: { id } });
  }
}

export default new RatingRepository();
