import { Card, CardContent, CardHeader, Typography } from "@mui/material";

const RatingBlockComponent = () => {
  return (
    <Card>
      <CardHeader>
        <Typography variant="h2">user: alonso</Typography>
        <Rating name="customized-10" defaultValue={2} max={10} />
      </CardHeader>
      <CardContent>
        <Typography>Phim như con cặc</Typography>
      </CardContent>
    </Card>
  );
};

export default RatingBlockComponent;
