const Sequelize = require("sequelize");
// const sequelize = require("../util/database");
const sequelize = require("./../Utli/database");

const TodoList = sequelize.define("todolists", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // description: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = TodoList;
