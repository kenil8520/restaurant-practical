import { Model, Table, Column, DataType } from "sequelize-typescript";
import RestaurantAttributes from "../interfaces/restaurant.interface";


@Table({
    tableName: "restaurant",
  })
  export default class Restaurant extends Model<RestaurantAttributes> implements RestaurantAttributes {
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
      field: "name"
    })
    name!: string;

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "address"
    })
    address!: string;

    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      field: "cuisine_type"
    })
    cuisine_type!: string;

    @Column({
      type: DataType.FLOAT,
      allowNull: false,
      field: "longitude"
    })
    longitude!: number;

    @Column({
      type: DataType.FLOAT,
      allowNull: false,
      field: "latitude"
    })
    latitude!: number;
  }

