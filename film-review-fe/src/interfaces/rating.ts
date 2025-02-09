export interface IRatingSubmit {
  userId: number;
  filmId: number;
  rating: number;
  comment: string;
}

export interface IFilmRating {
  userName: number;
  rating: number;
  comment: string;
}
