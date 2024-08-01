import { Application } from "express";
import userRouter from "./user.router";
import restaurantRouter from "./restaurant.router";
export default class Routes {
  constructor(app: Application) {
    app.use("/api/auth", userRouter);
    app.use("/api/restaurants", restaurantRouter);
  }
}
