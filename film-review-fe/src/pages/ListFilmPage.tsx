import FilmBlockComponent from "@/components/FilmBlockComponent";
import {
  Box,
  Card,
  CardContent,
  Grid2,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const ListFilmPage = () => {
  const handleGetFilmList = () => {};

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
          <Grid2 container>
            <Grid2 size={3}>
              <FilmBlockComponent film={null} />
            </Grid2>
            <Grid2 size={3}>
              <FilmBlockComponent film={null} />
            </Grid2>
            <Grid2 size={3}>
              <FilmBlockComponent film={null} />
            </Grid2>
            <Grid2 size={3}>
              <FilmBlockComponent film={null} />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </>
  );
};

export default ListFilmPage;
