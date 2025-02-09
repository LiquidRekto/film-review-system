import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user";

@Table({ tableName: "films", timestamps: true })
export class Film extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description!: string;

  @Column({ type: DataType.STRING })
  director!: string;

  @Column({ type: DataType.STRING })
  thumbnailPath!: string;

  @Column({ type: DataType.STRING })
  trailerUrl!: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  created_by!: number;
}
