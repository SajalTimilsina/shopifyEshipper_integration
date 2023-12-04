const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });
const server = app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
