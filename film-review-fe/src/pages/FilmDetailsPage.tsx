import RatingBlockComponent from "@/components/RatingBlockComponent";
import { API_R_200 } from "@/constants/error-codes";
import { IFilm } from "@/interfaces/film";
import { IFilmRating, IRatingSubmit } from "@/interfaces/rating";
import { FilmService } from "@/services/film.service";
import { RatingService } from "@/services/rating.service";
import { CommonUtils } from "@/utils/common.utils";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Pagination,
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
  const [finishRatingProcess, setFinishRatingProcess] = useState(false);
  const [finishSubmitProcess, setFinishSubmitProcess] = useState(true);
  const [filmDetail, setFilmDetail] = useState<IFilm | null>(null);
  const [filmRatingList, setFilmRatingList] = useState<IFilmRating[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const PAGE_RECORDS = 4;

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
      handleGetFilmRatings();
    } else {
      console.error("Error while fetching");
    }
    setFinishProcess(true);
  };

  const [ratingSubmitInfo, setRatingSubmitInfo] = useState<IRatingSubmit>({
    user_id: Number(CommonUtils.getUserId()),
    film_id: Number(id),
    rating_score: 0,
    comment: "",
  });

  const handleRatingSubmit = async () => {
    setFinishSubmitProcess(false);

    const res = (await RatingService.createRating(
      ratingSubmitInfo
    )) as AxiosResponse;
    if (res.status === API_R_200) {
      handleGetFilmRatings();
      setRatingSubmitInfo({
        user_id: Number(CommonUtils.getUserId()),
        film_id: Number(id),
        rating_score: 0,
        comment: "",
      });
    } else {
      console.log();
    }
    setFinishSubmitProcess(true);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    handleGetFilmRatings();
  }, [currentPage]);

  const handleGetFilmRatings = async () => {
    const filters = {
      offset: (currentPage - 1) * PAGE_RECORDS,
      limit: PAGE_RECORDS,
      order: "DESC",
      orderBy: "createdAt",
    };

    setFinishRatingProcess(false);
    if (isNaN(Number(id))) {
      setFinishRatingProcess(true);
      return;
    }
    const res = (await RatingService.getRatingsByFilm(
      Number(id),
      filters
    )) as AxiosResponse;
    if (res.status === API_R_200) {
      const records = res.data.records;
      setTotalPages(res.data.totalPages);
      setFilmRatingList(
        records.map((val) => {
          return {
            user_name: val.user.username,
            full_name: `${val.user.first_name} ${val.user.last_name}`,
            created_date: val.createdAt,
            rating: val.rating_score,
            comment: val.comment,
          } as IFilmRating;
        })
      );
    }
    setFinishRatingProcess(true);
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
        <Box sx={{ display: "block" }}>
          <Typography variant="h4">Leave a rating!</Typography>
          {!CommonUtils.getUserEmail() ? (
            <Typography color="error">
              Please login to use this function.
            </Typography>
          ) : (
            <></>
          )}
          <Box>
            <Rating
              onChange={(e, newVal) =>
                setRatingSubmitInfo({
                  ...ratingSubmitInfo,
                  rating_score: Number(newVal),
                })
              }
              readOnly={!CommonUtils.getUserEmail() ? true : false}
              value={ratingSubmitInfo.rating_score}
              max={10}
            />
          </Box>
          <Box>
            <TextField
              onChange={(e) =>
                setRatingSubmitInfo({
                  ...ratingSubmitInfo,
                  comment: e.target.value,
                })
              }
              disabled={!CommonUtils.getUserEmail() ? true : false}
              value={ratingSubmitInfo.comment}
              multiline
              rows={4}
            />
          </Box>
          <Button
            disabled={
              ratingSubmitInfo.rating_score <= 0 ||
              ratingSubmitInfo.comment.length <= 0 ||
              !CommonUtils.getUserEmail()
            }
            onClick={handleRatingSubmit}
            variant="contained"
            loading={!finishSubmitProcess}
          >
            Submit
          </Button>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Grid2 container spacing={4}>
            {finishRatingProcess ? (
              filmRatingList.map((val) => {
                return (
                  <Grid2 size={12}>
                    <RatingBlockComponent rating={val} />
                  </Grid2>
                );
              })
            ) : (
              <CircularProgress />
            )}
          </Grid2>
          {finishRatingProcess ? (
            <Pagination
              onChange={handlePageChange}
              page={currentPage}
              count={totalPages}
              color="primary"
            />
          ) : (
            <></>
          )}
        </Box>
      </>
    ) : (
      <Typography variant="h3">NOT FOUND</Typography>
    )
  ) : (
    <CircularProgress />
  );
};
