import express, { Request, Response } from "express";
import { RatingController } from "../controllers/rating.controller";

const router = express.Router();
const filmController = new RatingController();

// router.get("/:id", (req: Request, res: Response) => {
//   filmController.getFilmById(req, res);
// });

export default router;
