const port = process.env.PORT || 3000;
const Todo = require("./db/db");
// express
const express = require("express");
const app = express();
require("dotenv").config();
// express layout
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
const dotenv = require("dotenv");
dotenv.config();
// ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// method override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// app
app.get("/", async (req, res) => {
  const todo = await Todo.find();
  res.render("todo", {
    title: "My Agenda",
    todo: todo,
    layout: "layouts/main-layout",
  });
});
// add agenda
app.post("/todo", (req, res) => {
  Todo.insertMany(req.body).then(() => {
    res.redirect("/");
  });
});

// edit agenda
app.get("/edit/:kegiatan", async (req, res) => {
  const todo = await Todo.findOne({ kegiatan: req.params.kegiatan });
  res.render("edit", {
    title: "Edit Agenda",
    todo,
    layout: "layouts/main-layout",
  });
});

// edit process
app.put("/", (req, res) => {
  Todo.updateOne(
    {
      _id: req.body._id,
    },
    {
      $set: {
        kegiatan: req.body.kegiatan,
      },
    }
  ).then(() => {
    res.redirect("/");
  });
});

// delete agenda
app.delete("/todo", (req, res) => {
  Todo.deleteOne({ kegiatan: req.body.kegiatan }).then(() => {
    res.redirect("/");
  });
});

// about page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    layout: "layouts/main-layout",
  });
});

// listen to port
app.listen(port, () => {
  console.log(`page is running on port ${port}`);
});
