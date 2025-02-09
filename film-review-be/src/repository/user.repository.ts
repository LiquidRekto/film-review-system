import { IAccountLogin } from "@/interfaces/auth";
import { User } from "@/models/user";
import { comparePassword, hashPassword } from "@/utils/hashing";
import { Op } from "sequelize";

export class UserRepository {
  async createUser(data: Partial<User>): Promise<User> {
    return await User.create(data);
  }

  async getUserById(user_id: number): Promise<User | null> {
    return await User.findByPk(user_id);
  }
  async verfiyUser(data: IAccountLogin): Promise<User | null> {
    const u = await User.findOne({
      where: {
        username: { [Op.eq]: data.username },
      },
    });
    if (u && (await comparePassword(data.password, u?.password_hash!))) {
      return u;
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async updateUser(user_id: number, data: Partial<User>): Promise<void> {
    await User.update(data, { where: { user_id } });
  }

  async deleteUser(user_id: number): Promise<void> {
    await User.destroy({ where: { user_id } });
  }
}

export default new UserRepository();
