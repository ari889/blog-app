/**
 * external imports
 */
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

/**
 * internal imports
 */
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const postRouter = require("./routes/postRoutes");

/**
 * create express app
 */
const app = express();

/**
 * dot env config
 */
dotenv.config();

/**
 * request parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * add cors
 */
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

/**
 * connect mongoose
 */
mongoose
  .connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => console.log("Database connection successful!"))
  .catch((error) => console.log(error));

/**
 * set node static asset path
 */
app.use(express.static(path.join(__dirname, "public")));

/**
 * home route
 */
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to home Page!",
  });
});

/**
 * posts router
 */
app.use("/posts", postRouter);

/**
 * 404 not fund handler
 */
app.use(notFoundHandler);

/**
 * common error handler
 */
app.use(errorHandler);

/**
 * start express server
 */
app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
