import RatingBlockComponent from "@/components/RatingBlockComponent";
import { API_R_200 } from "@/constants/error-codes";
import { IFilm } from "@/interfaces/film";
import { IFilmRating } from "@/interfaces/rating";
import { FilmService } from "@/services/film.service";
import { RatingService } from "@/services/rating.service";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const FilmDetailsPage = () => {
  const { id } = useParams();
  const [filmRating, setFilmRating] = useState(0);
  const [ratingComment, setRatingComment] = useState("");

  const [finishProcess, setFinishProcess] = useState(false);
  const [filmDetail, setFilmDetail] = useState<IFilm | null>(null);
  const [filmRatingList, setFilmRatingList] = useState<IFilmRating[]>([]);

  const handleGetFilm = async () => {
    setFinishProcess(false);
    if (isNaN(Number(id))) {
      setFinishProcess(true);
      return;
    }
    const res = (await FilmService.getFilmById(Number(id))) as AxiosResponse;
    if (res.status === API_R_200) {
      console.log(res.data);
      setFilmDetail(res.data);
    } else {
      console.error("Error while fetching");
    }
    setFinishProcess(true);
  };

  const handleGetFilmRatings = async () => {
    setFinishProcess(false);
    if (isNaN(Number(id))) {
      setFinishProcess(true);
      return;
    }
    const res = (await RatingService.getRatingsByFilm(
      Number(id)
    )) as AxiosResponse;
    if (res.status === API_R_200) {
      setFilmDetail(res.data.data);
    }
    setFinishProcess(true);
  };

  useEffect(() => {
    handleGetFilm();
  }, []);

  return finishProcess ? (
    filmDetail ? (
      <>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "50%" }}>
            <img src={filmDetail.thumbnail_path} />
            <Box>
              <iframe
                width="560"
                height="315"
                src={filmDetail.trailerUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </Box>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="h5">Title:</Typography>
            <Typography>{filmDetail.title}</Typography>
            <Typography variant="h5">Description:</Typography>
            <Typography>{filmDetail.description}</Typography>
            <Typography variant="h5">Directors:</Typography>
            <Typography>{filmDetail.director}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4">Leave a rating!</Typography>
          <Box>
            <Rating
              onChange={(e, newVal) => setFilmRating(Number(newVal))}
              value={filmRating}
              max={10}
            />
          </Box>
          <Box>
            <TextField
              onChange={(e) => setRatingComment(e.target.value)}
              value={ratingComment}
            />
          </Box>
          <Button
            disabled={filmRating <= 0 || ratingComment.length <= 0}
            variant="contained"
          >
            Submit
          </Button>
        </Box>
        <Box></Box>
      </>
    ) : (
      <Typography variant="h3">NOT FOUND</Typography>
    )
  ) : (
    <CircularProgress />
  );
};
