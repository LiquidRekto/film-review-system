import express, { Request, Response } from "express";
import { FilmController } from "../controllers/film.controller";
import { authorize } from "@/middlewares/authorization";

const router = express.Router();
const filmController = new FilmController();

router.get("/:id", (req: Request, res: Response) => {
  filmController.getFilmById(req, res);
});

router.get("/", authorize(["admin"]), (req: Request, res: Response) => {
  filmController.getAllFilms(req, res);
});

export default router;
