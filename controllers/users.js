import User from "../models/users.js";
import request from "request";
import path from "path";
import fs from "fs";
import mime from "mime";

export const main = (req, res) => {
  res.redirect("/Task1");
};

export const task1 = (req, res) => {
  if (req.method === "POST") {
    let result;
    result =
      req.body.age > 18 ? `Hello ${req.body.name} ${req.body.surname}` : "";
    res.render("index", { page: "Task1", param: result, error: "" });
  } else {
    res.render("index", { page: "Task1", param: "", error: "" });
  }
};

export const task2 = async (req, res) => {
  if (req.method === "POST") {
    let result, error;
    try {
      if (req.body.age > 18) {
        const user = new User({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          age: req.body.age,
        });
        await user.save();
        result = "Done";
      } else {
        error = "Error: Age too low";
      }
    } catch (e) {
      error = `Error: ${e._message}`;
    }
    res.render("index", { page: "Task2", param: result, error: error });
  } else {
    res.render("index", { page: "Task2", param: "", error: "" });
  }
};

export const task3 = async (req, res) => {
  if (req.method === "POST") {
    let result, error;
    try {
      const users = await User.find({ email: req.body.email });
      if (users.length) {
        result = users;
      } else {
        error = "Users not found";
      }
    } catch (e) {
      error = `Error: ${e._message}`;
    }
    res.render("index", { page: "Task3", param: result, error: error });
  } else {
    res.render("index", { page: "Task3", param: "", error: "" });
  }
};

export const task5 = async (req, res) => {
  if (req.method === "POST") {
    request("https://reqres.in/api/users", (err, response, body) => {
      if (err) throw err;
      let data = JSON.parse(body).data;
      let file = path.resolve(path.resolve(), "data.csv");
      let content = "ID, Email, First Name, Last Name\n";
      for (let cur_user of data) {
        content += `${cur_user.id}, ${cur_user.email}, ${cur_user.first_name}, ${cur_user.last_name}\n`;
      }
      fs.writeFile(file, content, (err) => {
        if (err) throw err;
        let filename = path.basename(file);
        let mimetype = mime.lookup(file);
        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + filename
        );
        res.setHeader("Content-type", mimetype);
        res.download(file);
      });
    });
  } else {
    res.render("index", { page: "Task5", param: "", error: "" });
  }
};
