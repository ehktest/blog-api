"use strict";
/* ------------------------------------------------------------------ */
// -                           Blog API
/* ------------------------------------------------------------------ */

require("dotenv").config();
const express = require("express");
const app = express();
const { logger } = require("./src/controllers/logEvents");
const connectDB = require("./src/configs/dbConnection");
const syncModels = require("./src/sync");
const session = require("cookie-session");
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

// logger
app.use(logger);

// Accept JSON and convert to object
app.use(express.json());
// Accept text
app.use(express.text());
// Accept form
app.use(express.urlencoded({ extended: true }));

// ? Allow static files
app.use("/static", express.static("./public"));

// IIFE Server
(async () => {
  // Veritabanı bağlantısını test et
  await connectDB();

  // sync models(model degisikliklerinin database'de manuel olarak handle edilmesi)
  await syncModels();

  // ? SessionCookies:
  app.use(
    session({
      secret: process.env.SECRET_KEY,
    })
  );

  // ? Custom Middlewares
  // Check whether logged in user's session/cookie data is up-to-date
  app.use(require("./src/middlewares/userCheck"));

  // Filter, Search, Sort, Pagination middleware
  app.use(require("./src/middlewares/findSearchSortPage"));

  // root routes -> Added functionality control of userCheck middleware
  app.use("/", require("./src/routes"));
  // index.js dosyalari path'te belirtilmese de otomatik olarak calisir.

  // blog routes
  app.use("/blog", require("./src/routes/blogRoute"));
  // index.js dosyalari path'te belirtilmese de otomatik olarak calisir.

  // user routes
  app.use("/user", require("./src/routes/userRoute"));

  // not found catcher
  app.all("*", (req, res) => {
    res.status(404).send(`${req.method} ${req.path} not found`);
  });

  // error handler middleware via imported controller
  app.use(require("./src/middlewares/errorHandler"));

  // request listener
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
})();
