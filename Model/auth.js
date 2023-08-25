const Sequelize = require("sequelize");
const db = require("../Utli/database");
// const { Module } = require("module");

const Auth = db.define("Auth", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Auth;
