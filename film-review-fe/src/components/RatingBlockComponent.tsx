import { IFilmRating } from "@/interfaces/rating";
import {
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface Props {
  rating: IFilmRating;
}

const RatingBlockComponent: FC<Props> = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.rating.userName}</Typography>
        <Rating
          name="customized-10"
          value={props.rating.rating}
          readOnly
          max={10}
        />
        <Typography>{props.rating.comment}</Typography>
      </CardContent>
    </Card>
  );
};

export default RatingBlockComponent;
