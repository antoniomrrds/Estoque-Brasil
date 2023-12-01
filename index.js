const express = require("express");
const app = express();
const router = require("./routes/routes");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.use(cookieParser("asdasda"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6000 },
  })
);
app.use(flash());

app.use(router);

const DB = process.env.DB;

const PORT = 4500;
mongoose
  .connect(DB)
  .then(
    app.listen(PORT, (_) =>
      console.log(`Conectou no banco !!!\n http://localhost:${PORT} `)
    )
  )
  .catch((err) => console.log(err));
