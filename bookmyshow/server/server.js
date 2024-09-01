const express = require("express");
const { bookingRouter } = require("./getDetails");
const cors = require("cors");
const connectDB = require("./mongoDB/connectMongo");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", bookingRouter);

const port = process.env.PORT ?? 8080;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("App listening on port ", port);
    });
  })
  .catch((error) => {
    console.error("Cannot start server", error.message);
  });