import express, { Request, Response } from "express";
import { FilmController } from "../controllers/film.controller";

const router = express.Router();
const filmController = new FilmController();

router.get("/:id", (req: Request, res: Response) => {
  filmController.getFilmById(req, res);
});

export default router;
