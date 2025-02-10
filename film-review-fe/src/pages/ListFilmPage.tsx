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
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

const ListFilmPage = () => {
  const [filmRecords, setFilmRecords] = useState<IFilm[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_RECORDS = 8;

  const handleGetFilmList = async () => {
    const filters = {
      offset: (currentPage - 1) * PAGE_RECORDS,
      limit: PAGE_RECORDS,
      order: "ASC",
      orderBy: "createdAt",
    };

    const res = (await FilmService.getAllFims(filters)) as AxiosResponse;
    if (res.status === API_R_200) {
      setFilmRecords(res.data.records);
      console.log(res.data);
      setTotalPages(res.data.totalPages);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    handleGetFilmList();
  }, []);

  useEffect(() => {
    handleGetFilmList();
  }, [currentPage]);

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        List Films
      </Typography>
      <Box>
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
        <Box>
          <Pagination
            onChange={handlePageChange}
            page={currentPage}
            defaultPage={1}
            count={totalPages}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default ListFilmPage;
