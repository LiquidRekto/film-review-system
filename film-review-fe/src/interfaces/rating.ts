import { IAccountInfo } from "./auth";

export interface IRatingSubmit {
  user_id: number;
  film_id: number;
  rating_score: number;
  comment: string;
}

export interface IFilmRating {
  user_name: number;
  full_name: string;
  created_date: string;
  rating: number;
  comment: string;
}
