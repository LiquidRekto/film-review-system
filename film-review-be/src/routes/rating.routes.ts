import express, { Request, Response } from "express";
import { RatingController } from "../controllers/rating.controller";
import { authorize } from "@/middlewares/authorization";

const router = express.Router();
const ratingController = new RatingController();

router.get("/", authorize(["admin"]), (req: Request, res: Response) => {
  ratingController.getAllRatings(req, res);
});

router.get("/byFilm/:film_id", (req: Request, res: Response) => {
  ratingController.getRatingsOfFilmAndUser(req, res);
});

router.post(
  "/",
  authorize(["admin", "user"]),
  (req: Request, res: Response) => {
    ratingController.createRating(req, res);
  }
);

router.delete("/:id", authorize(["admin"]), (req: Request, res: Response) => {
  ratingController.deleteRating(req, res);
});

export default router;
