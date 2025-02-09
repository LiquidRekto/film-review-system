import { API_R_400 } from "@/constants/res-codes";
import {
  IAccountInfo,
  IAccountLogin,
  IAccountRegister,
  ITokenInfo,
} from "@/interfaces/auth";
import { APIError } from "@/interfaces/response";
import { User } from "@/models/user";
import { UserRepository } from "@/repository/user.repository";
import { JWT } from "@/utils/jwt";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(data: IAccountLogin) {
    try {
      const user = await this.userRepository.verfiyUser(data);
      if (user !== null) {
        const userInfo: IAccountInfo = {
          username: user?.username,
          first_name: user?.first_name,
          last_name: user?.last_name,
          dob: user?.dob,
          email: user?.email,
          phone_number: user?.phone_number,
          role: user?.role,
        };

        return {
          token: JWT.generateToken(userInfo),
        } as ITokenInfo;
      }
      console.log("USER " + user);
      return null;
    } catch (e) {
      return null;
    }
  }

  async register(data: IAccountRegister): Promise<User> {
    // const userData: User = {
    //   username: data.username,
    // };
    const newUser = this.userRepository.createUser(data);

    return newUser;
  }
}

export default new AuthService();
