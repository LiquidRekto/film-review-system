import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
} from "@/constants/db-info";
import { Film } from "@/models/film";
import { Rating } from "@/models/rating";
import { User } from "@/models/user";
import { Sequelize } from "sequelize-typescript";

// Passing parameters
export const sequelize = new Sequelize({
  dialect: DB_DIALECT || "mysql", // Change this based on your database (mysql, postgres, sqlite, etc.)
  host: DB_HOST || "localhost",
  username: DB_USERNAME || "root",
  password: DB_PASSWORD || "password",
  database: DB_NAME || "film_review",
  models: [User, Film, Rating], // Register models here
});
