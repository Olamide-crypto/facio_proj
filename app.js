const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authmiddleware");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://olamide:1234@cluster0.f7hgm.mongodb.net/node-proj";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port))
  .catch((err) => console.log(err));

const port = 4000 || process.env.port;

// routes
app.get("*", checkUser);
app.get("/", requireAuth, (req, res) =>
  res.render("home", { title: "Homepage" })
);
app.use(authRoutes);
