const express = require("express");
const router = express.Router();
const todoController = require("../Controller/todo");
const tokenValidation = require("../Middleware/middleware");
router.post("/todo", tokenValidation, todoController.additem);

router.get("/todo", tokenValidation, todoController.getall);
router.patch("/todo", tokenValidation, todoController.updateitem);
router.delete("/todo", tokenValidation, todoController.deleteitem);
module.exports = router;
