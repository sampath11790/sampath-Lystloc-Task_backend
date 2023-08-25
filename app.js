require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Utli/database");
//support package
app.use(cors());
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

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3001);
  })
  .catch((err) => console.log("err errer message ", err));
