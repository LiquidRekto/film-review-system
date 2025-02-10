import express, { Request, Response } from "express";
import { FilmController } from "../controllers/film.controller";
import { authorize } from "@/middlewares/authorization";
import { upload } from "@/utils/file";

const router = express.Router();
const filmController = new FilmController();

router.get("/:id", (req: Request, res: Response) => {
  filmController.getFilmById(req, res);
});

router.get("/", (req: Request, res: Response) => {
  filmController.getAllFilms(req, res);
});

router.post(
  "/",
  authorize(["admin"]),
  upload.single("thumbnail"),
  (req: Request, res: Response) => {
    filmController.createFilm(req, res);
  }
);

router.delete("/:id", authorize(["admin"]), (req: Request, res: Response) => {
  filmController.deleteFilm(req, res);
});

export default router;
