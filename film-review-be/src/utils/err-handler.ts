import { API_R_400 } from "@/constants/res-codes";
import { APIError } from "@/interfaces/response";
import { Response } from "express";

export const handleError = (res: Response, e: any) => {
  if (e instanceof APIError) {
    return res.status(e.statusCode).json({ message: e.message });
  } else {
    console.log(e);
    return res.status(API_R_400).json({ message: "Unexpected error occured" });
  }
};
