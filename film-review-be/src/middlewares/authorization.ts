import { API_R_400, API_R_401, API_R_403 } from "@/constants/res-codes";
import { IAccountInfo } from "@/interfaces/auth";
import { APIError, APIResponse } from "@/interfaces/response";
import { JWT } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization);
    const token = req.header("Authorization")?.split(" ")[1]; // Extract Bearer Token
    if (!token) {
      res.status(API_R_401).json({ message: "Access Denied" });
      return;
    }

    try {
      const decoded = JWT.decodeToken(token!);
      let role = (decoded as IAccountInfo).role;

      if (roles.length && !roles.includes(role)) {
        res.status(API_R_403).json({ message: "Forbidden" });
        return;
      }

      next();
    } catch (err) {
      res.status(API_R_400).json({ message: "Invalid Token" });
      return;
    }
  };
};
