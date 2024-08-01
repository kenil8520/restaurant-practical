import express, { Application } from "express";
import Server from "./src/index";

const app: Application = express();
const server: Server = new Server(app);

const PORT:any = process.env.PORT

app.get('/', (req, res) =>{
  res.json({success: false, message : "API working"})
})

app
  .listen(PORT, "localhost", function () {
    console.log(`server running on http://localhost:${PORT}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
