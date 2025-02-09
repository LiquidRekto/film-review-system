import { IAccountLogin, IAccountRegister } from "@/interfaces/auth";
import { User } from "@/models/user";
import { UserRepository } from "@/repository/user.repository";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(data: IAccountLogin) {}

  async register(data: IAccountRegister): Promise<User> {
    const userData: User = {
      username: data.username,
    };
    const newUser = this.userRepository.createUser(userData);

    return newUser;
  }
}

export default new AuthService();
