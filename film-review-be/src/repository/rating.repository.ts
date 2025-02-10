import { IPageRecords, IRecordFilter } from "@/interfaces/pagination";
import { Film } from "@/models/film";
import { Rating } from "@/models/rating";
import { User } from "@/models/user";
import { sequelize } from "@/utils/db";
import { FindAndCountOptions, Op, Order, WhereOptions } from "sequelize";

export class RatingRepository {
  async createRating(data: Partial<Rating>): Promise<Rating> {
    return await Rating.create(data);
  }

  async getAllRatings(filter: IRecordFilter): Promise<IPageRecords<Rating>> {
    // No filter queries (searchBy, searchQuery) for ratings
    const { count, rows } = await Rating.findAndCountAll({
      limit: filter.limit,
      offset: filter.offset,
      order: [[filter.orderBy!, filter.order!]],
      // where: filterQuery,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / filter.limit!),
      currentPage: filter.offset!,
      records: rows,
    };
  }

  async getRatingById(id: number) {
    return await Rating.findByPk(id);
  }

  async getRatingByFilmAndUser(
    film_id: number,
    user_id: number,
    filter: IRecordFilter
  ): Promise<IPageRecords<Rating>> {
    // No filter queries (searchBy, searchQuery) for ratings
    const whereOp: WhereOptions<any> = {
      film_id: { [Op.eq]: film_id },
      user_id: { [Op.eq]: user_id },
    };

    if (!user_id) delete whereOp.user_id;

    const { count, rows } = await Rating.findAndCountAll({
      limit: filter.limit,
      offset: filter.offset,
      include: {
        model: User,
        attributes: ["username", "first_name", "last_name", "createdAt"],
      },
      order: [[filter.orderBy!, filter.order!]],
      where: whereOp,
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / filter.limit!),
      currentPage: filter.offset!,
      records: rows,
    };
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
