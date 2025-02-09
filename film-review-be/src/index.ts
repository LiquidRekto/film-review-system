import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import filmRoutes from "@/routes/film.routes";
import authRoutes from "@/routes/auth.routes";
import ratingRoutes from "@/routes/rating.routes";
import { sequelize } from "./utils/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/rating", ratingRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TS Server");
});

// Ensure to initialize Sequelize first then Server connection later.
sequelize
  .sync({ force: false }) // Set `force: true` to reset tables on restart
  .then(() => {
    console.log("Database connected ✅");
    app.listen(port, () => {
      console.log(`[server] Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error ❌:", error);
  });
