import { IAccountInfo } from "@/interfaces/auth";
import jwt from "jsonwebtoken";

export class JWT {
  static generateToken = (payload: IAccountInfo) => {
    return jwt.sign(
      payload, // Payload
      process.env.TOKEN_SECRET!, // Secret key
      { expiresIn: 3600 * 1000 } // Options
    );
  };

  static decodeToken = (token: string) => {
    return jwt.verify(token, process.env.TOKEN_SECRET!);
  };
}
