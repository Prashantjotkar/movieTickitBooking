const mongoose = require("mongoose");

async function connectDB() {
  const mongoURI = `${process.env.MONGO_DB_URI}`
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("mongodb server is online");
    })
    .catch((err) => {
      console.error("error while connection", err.message);
      throw new Error("Failed To Connect");
    });
}

module.exports = connectDB;