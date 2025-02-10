export interface IFilm {
  id: number;
  title: string;
  description: string;
  director: string;
  thumbnail_path: string;
  trailerUrl: string;
  avg_rating?: number;
}
