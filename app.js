const express = require("express");
const exphbs = require("express-handlebars");
const userRouter = require("./routers/users");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();
const PORT = 5000 || process.env.PORT;

//MongoDB connection
mongoose.connect(
  "mongodb+srv://umit:ZR9lyb22Qb69qYrA@cluster0.lf5pbjx.mongodb.net/passport?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
  console.log("Connected to Database");
});
// Template Engine Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout: "mainLayout" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Router Middleware
app.use(userRouter);

app.get("/", (req, res, next) => {
    console.log("sdssss");
  User.find({})
    .then((users) => {
      console.log("sdsd" + users);
      res.render("pages/index", { users: users });
    })
    .catch((err) => console.log(err));
  //  res.render("pages/index");
});

app.use((req, res, next) => {
  res.render("static/404");
  // res.send("404 Not Found");
});

app.listen(PORT, () => {
  console.log("App Started");
});
