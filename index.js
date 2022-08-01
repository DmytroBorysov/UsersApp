"use strict";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/users.js";

const PORT = process.env.PORT || 80;

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(routes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://user:CYILGphPTI7xn1Km@cluster0.dq49p.mongodb.net/users"
    );
    app.listen(PORT, () => {
      console.log("Started...");
    });
  } catch (e) {
    console.log(e);
  }
}

start();
