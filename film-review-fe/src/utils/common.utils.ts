import { jwtDecode } from "jwt-decode";
import { StorageUtils } from "./storage.utils";
import { IAccountInfo } from "@/interfaces/auth";
//import type { ITokenInfo } from "../interfaces/Account";
//import type { ITokenPayload } from "../interfaces/JWT";

export class CommonUtils {
  static getUserEmail(): string | null {
    try {
      const tokenInfoStr = StorageUtils.getItem("tokenInfo");
      const tokenInfo = JSON.parse(tokenInfoStr);
      console.log(tokenInfo.token);
      const decodedAccessInfo = jwtDecode(tokenInfo.token) as IAccountInfo;
      console.log(decodedAccessInfo);
      return decodedAccessInfo.email;
    } catch (e) {
      return null;
    }
  }

  static getUserRole(): string | null {
    try {
      const tokenInfoStr = StorageUtils.getItem("tokenInfo");
      const tokenInfo = JSON.parse(tokenInfoStr);
      console.log(tokenInfo.token);
      const decodedAccessInfo = jwtDecode(tokenInfo.token) as IAccountInfo;
      console.log(decodedAccessInfo);
      return decodedAccessInfo.role;
    } catch (e) {
      return null;
    }
  }
}
