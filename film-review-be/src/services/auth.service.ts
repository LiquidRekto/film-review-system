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
          id: user?.id,
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
      return null;
    } catch (e) {
      return null;
    }
  }

  async register(data: IAccountRegister): Promise<ITokenInfo> {
    // const userData: User = {
    //   username: data.username,
    // };
    const newUser = await this.userRepository.createUser(data);
    const userInfo: IAccountInfo = {
      id: newUser.id,
      username: newUser.username,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      dob: newUser.dob,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role: newUser.role,
    };
    return {
      token: JWT.generateToken(userInfo),
    } as ITokenInfo;
  }
}

export default new AuthService();
