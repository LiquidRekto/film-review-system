import FilmBlockComponent from "@/components/FilmBlockComponent";
import { API_R_200 } from "@/constants/error-codes";
import { IFilm } from "@/interfaces/film";
import { FilmService } from "@/services/film.service";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

const ListFilmPage = () => {
  const [filmRecords, setFilmRecords] = useState<IFilm[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [order, setOrder] = useState("ASC");
  const [orderBy, setOrderBy] = useState("createdAt");
  const PAGE_RECORDS = 8;

  const [filters, setFilters] = useState({
    offset: 0,
    limit: PAGE_RECORDS,
    order: "ASC",
    orderBy: "createdAt",
    searchBy: "both",
    searchQuery: "",
  });

  const handleGetFilmList = async () => {
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
    setFilters({ ...filters, offset: (value - 1) * PAGE_RECORDS });
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
      <Grid2 container columnSpacing={4} sx={{ display: "flex", p: 4 }}>
        <Grid2 size={3}>
          <Card elevation={4}>
            <CardContent>
              <Select
                sx={{ my: 2, mx: 1 }}
                value={filters.order}
                label="Order"
                onChange={(e) =>
                  setFilters({ ...filters, order: e.target.value })
                }
              >
                <MenuItem value={"ASC"}>Ascending</MenuItem>
                <MenuItem value={"DESC"}>Descending</MenuItem>
              </Select>
              <Select
                sx={{ my: 2, mx: 1 }}
                value={filters.orderBy}
                label="Order by"
                onChange={(e) =>
                  setFilters({ ...filters, orderBy: e.target.value })
                }
              >
                <MenuItem value={"createdAt"}>Date of creation</MenuItem>
                <MenuItem value={"title"}>Film title</MenuItem>
                <MenuItem value={"director"}>Film director</MenuItem>
              </Select>
              <Select
                sx={{ my: 2, mx: 1 }}
                value={filters.searchBy}
                label="Search by"
                onChange={(e) =>
                  setFilters({ ...filters, searchBy: e.target.value })
                }
              >
                <MenuItem value={"both"}>Both</MenuItem>
                <MenuItem value={"title"}>Film title</MenuItem>
                <MenuItem value={"director"}>Film director</MenuItem>
              </Select>
              <TextField
                sx={{ my: 2, mx: 1 }}
                onChange={(e) =>
                  setFilters({ ...filters, searchQuery: e.target.value })
                }
                value={filters.searchQuery}
                label="Search keyword"
              />
            </CardContent>
            <CardActions sx={{ p: 2, display: "flex", justifyContent: "end" }}>
              <Button variant="contained" onClick={handleGetFilmList}>
                Search
              </Button>
            </CardActions>
          </Card>
          <Box display="flex" justifyContent="center">
            <Pagination
              sx={{ my: 2 }}
              onChange={handlePageChange}
              page={currentPage}
              defaultPage={1}
              count={totalPages}
              color="primary"
            />
          </Box>
        </Grid2>
        <Grid2 size={9}>
          <Grid2 container rowSpacing={4}>
            {filmRecords.map((film) => {
              return (
                <Grid2 size={3}>
                  <FilmBlockComponent film={film} />
                </Grid2>
              );
            })}
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ListFilmPage;
