import FilmBlockComponent from "@/components/FilmBlockComponent";
import { API_R_200 } from "@/constants/error-codes";
import { IFilm } from "@/interfaces/film";
import { FilmService } from "@/services/film.service";
import {
  Box,
  Card,
  CardContent,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

const ListFilmPage = () => {
  const [filmRecords, setFilmRecords] = useState<IFilm[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_RECORDS = 8;

  const handleGetFilmList = async () => {
    const filters = {
      offset: currentPage,
      limit: PAGE_RECORDS,
      order: "ASC",
      orderBy: "createdAt",
    };

    const res = (await FilmService.getAllFims(filters)) as AxiosResponse;
    console.log(res.data);
    if (res.status === API_R_200) {
      setFilmRecords(res.data.records);
    }
  };

  useEffect(() => {
    handleGetFilmList();
  }, []);

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        List Films
      </Typography>
      <Box sx={{ display: "flex", p: 4 }}>
        <Box sx={{ p: 2, width: "20%" }}>
          <Card>
            <CardContent>
              <TextField label="Keyword" />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ p: 2, width: "80%" }}>
          <Grid2 container rowSpacing={4}>
            {filmRecords.map((film) => {
              return (
                <Grid2 size={3}>
                  <FilmBlockComponent film={film} />
                </Grid2>
              );
            })}
          </Grid2>
        </Box>
      </Box>
    </>
  );
};

export default ListFilmPage;
