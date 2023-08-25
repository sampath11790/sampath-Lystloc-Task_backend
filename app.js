require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utli/database");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");

const accesslogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a",
  }
);
app.use(morgan("combined", { stream: accesslogStream }));
//support package

app.use(cors());
app.use(helmet());
app.use(bodyparser.json({ extended: false }));
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
//table
const TodoList = require("./Model/todo");
const User = require("./Model/auth");
//Route
const RouteList = require("./Router/todo");
const AuthRouter = require("./Router/auth");
app.use(RouteList);
app.use(AuthRouter);

// Association
User.hasMany(TodoList);
TodoList.belongsTo(User);
//404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "View", "404.html"));
});
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log("err errer message ", err));
