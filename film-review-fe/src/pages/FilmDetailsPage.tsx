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
        <Grid2 container sx={{ p: 4 }}>
          {/*First 2 columns */}
          <Grid2 size={6} sx={{ p: 2 }}>
            <Box sx={{ width: "25%", height: "50%" }}>
              <img src={filmDetail.thumbnail_path} />
            </Box>
          </Grid2>
          <Grid2 size={6}>
            <Box sx={{ width: "50%" }}>
              <Typography variant="h5">Title:</Typography>
              <Typography>{filmDetail.title}</Typography>
              <Typography variant="h5">Description:</Typography>
              <Typography>{filmDetail.description}</Typography>
              <Typography variant="h5">Directors:</Typography>
              <Typography>{filmDetail.director}</Typography>
            </Box>
          </Grid2>
        </Grid2>
        {/*Large area below */}
        <Grid2
          sx={{ p: 4 }}
          columnSpacing={4}
          container
          justifyContent="center"
          display="flex"
        >
          <Grid2 size={6}>
            <Typography variant="h4">Leave a rating!</Typography>
            {!CommonUtils.getUserEmail() ? (
              <Typography color="error">
                Please login to use this function.
              </Typography>
            ) : (
              <></>
            )}
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
            <br />
            <TextField
              sx={{ width: "100%" }}
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
            <Button
              sx={{ my: 2 }}
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
          </Grid2>

          <Grid2 size={6} justifyContent="center">
            <Grid2 container spacing={6}>
              {finishRatingProcess ? (
                filmRatingList.length > 0 ? (
                  filmRatingList.map((val) => {
                    return (
                      <Grid2 size={12}>
                        <RatingBlockComponent rating={val} />
                      </Grid2>
                    );
                  })
                ) : (
                  <Typography
                    variant="h3"
                    sx={{ fontStyle: "italic", color: "gray" }}
                  >
                    No ratings available
                  </Typography>
                )
              ) : (
                <CircularProgress />
              )}
            </Grid2>
            <Box display="flex" justifyContent="center">
              {finishRatingProcess ? (
                <Pagination
                  sx={{ py: 2 }}
                  onChange={handlePageChange}
                  page={currentPage}
                  count={totalPages}
                  color="primary"
                />
              ) : (
                <></>
              )}
            </Box>
          </Grid2>
        </Grid2>
      </>
    ) : (
      <Typography variant="h3">NOT FOUND</Typography>
    )
  ) : (
    <CircularProgress />
  );
};
