import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import { Rating } from "./rating";

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
  thumbnail_path!: string;

  // Association: User has many Ratings
  @HasMany(() => Rating)
  ratings!: Rating[];
}
