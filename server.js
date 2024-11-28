"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const useragent = require("express-useragent");
const http = require("http");

const authenticationRouter = require("./authentication/authentication.router.js");
const userRouter = require("./user/user.router.js");
const projectRouter = require("./project/project.router.js");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(useragent.express());
app.use(helmet());
app.disable("x-powered-by");
app.use(
  cors({
    origin: [
      "https://localhost:3001",
      "https://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:4200",
      "https://localhost:4200",
      "http://todo-ease.com",
      "https://todo-ease.com",
    ],
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/authentication", authenticationRouter);
app.use("/user", userRouter);
app.use("/project", projectRouter);

module.exports.start = async () => {
  try {
    server.listen(3012, () => {
      console.info(`server running at port: ${3012}`);
    });
  } catch (e) {
    console.error(e);
  }
};
