export interface IRatingSubmit {
  userId: number;
  filmId: number;
  rating: number;
  comment: string;
}

export interface IFilmRating {
  user_name: number;
  rating: number;
  comment: string;
}
