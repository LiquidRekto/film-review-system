import { sequelize } from "@/utils/db";
import { Film } from "./film";
import { Rating } from "./rating";
import { Column, DataType, Model, Table } from "sequelize-typescript";

// export const User = sequelize.define(
//   "User",
//   {
//     user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     username: { type: DataTypes.STRING(50), unique: true, allowNull: false },
//     email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
//     password_hash: { type: DataTypes.TEXT, allowNull: false },
//     role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
//   },
//   { timestamps: true }
// );

// User.hasMany(Film, { foreignKey: "created_by", onDelete: "SET NULL" });
// User.hasMany(Rating, { foreignKey: "user_id", onDelete: "CASCADE" });

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash!: string;

  @Column({ type: DataType.ENUM("admin", "user"), defaultValue: "user" })
  role!: string;
}
