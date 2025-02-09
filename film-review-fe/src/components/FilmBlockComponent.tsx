import { IFilm } from "@/interfaces/film";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface Props {
  film: IFilm;
}

const FilmBlockComponent: FC<Props> = () => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 300, maxWidth: 300 }}
        image="landscape-placeholder.svg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="text">
          View details...
        </Button>
      </CardActions>
    </Card>
  );
};

export default FilmBlockComponent;
