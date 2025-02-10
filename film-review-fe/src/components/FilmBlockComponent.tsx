import { IFilm } from "@/interfaces/film";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  film: IFilm;
}

const FilmBlockComponent: FC<Props> = (props) => {
  const navigate = useNavigate();

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.image = "landscape-placeholder.svg";
  };

  return (
    <Card
      elevation={4}
      sx={{ maxWidth: 300, height: 600, backgroundColor: "gold" }}
    >
      <CardMedia
        sx={{ height: 400, maxWidth: 300 }}
        image={props.film.thumbnail_path}
        onError={handleImageError}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.film.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.film.description}
        </Typography>
        {props.film.avg_rating ? (
          <Box display="flex" alignContent="center">
            <Rating value={1} readOnly max={1} />
            <Typography sx={{ fontSize: "1.1em" }}>
              {Number(props.film.avg_rating).toFixed(1)}/10
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontStyle: "italic", color: "gray" }}>
            No ratings
          </Typography>
        )}
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
