import { Model, Table, Column, DataType } from "sequelize-typescript";
import UserAttributes from "../interfaces/user.interface"

@Table({
  tableName: "user",
})
export default class User extends Model<UserAttributes> implements UserAttributes {
  @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
  })
  id?: number;

  @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "email"
  })
  email!: string;

  @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "password"
  })
  password!: string;
}
