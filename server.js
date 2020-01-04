const express = require("express");
const app = express();
const session = require("express-session");
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  })
);
app.get("/", (req, res) => {
  res.render("index");
});

app.use(express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.listen(8000, () => console.log("listening on port 8000"));

app.post("/process", (req, res) => {
  req.session.FullName = req.body.FullName;
  req.session.Location = req.body.Location;
  req.session.Language = req.body.Language;
  req.session.Comment = req.body.Comment;
  res.redirect("/result");
});

app.get("/result", (req, res) => {
  var context = {
    FullName: req.session.FullName,
    Location: req.session.Location,
    Language: req.session.Language,
    Comment: req.session.Comment
  };
  console.log(context);
  res.render("results", {context: context});
});

