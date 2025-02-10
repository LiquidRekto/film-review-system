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
import { useNavigate } from "react-router";

interface Props {
  film: IFilm;
}

const FilmBlockComponent: FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 400, maxWidth: 300 }}
        image="landscape-placeholder.svg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.film.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.film.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/films/${props.film.id}`)}
          size="small"
          variant="text"
        >
          Film details...
        </Button>
      </CardActions>
    </Card>
  );
};

export default FilmBlockComponent;
