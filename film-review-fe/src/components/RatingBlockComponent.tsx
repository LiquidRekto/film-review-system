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
    <Card sx={{ width: "80%" }}>
      <CardContent>
        <Typography variant="h5">{props.rating.full_name}</Typography>
        <Typography variant="h6" style={{ fontStyle: "italic" }}>
          {props.rating.user_name}
        </Typography>
        <Rating
          name="customized-10"
          value={props.rating.rating}
          readOnly
          max={10}
        />
        <Typography style={{ fontStyle: "italic" }}>
          {props.rating.comment}
        </Typography>
        <Typography>{props.rating.created_date}</Typography>
      </CardContent>
    </Card>
  );
};

export default RatingBlockComponent;
