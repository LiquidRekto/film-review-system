import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";
import { Film } from "./film";

@Table({ tableName: "ratings", timestamps: true })
export class Rating extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id!: number;

  @ForeignKey(() => Film)
  @Column({ type: DataType.INTEGER })
  film_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 10 },
  })
  rating_score!: number;

  @Column({ type: DataType.TEXT })
  comment!: string;
}
