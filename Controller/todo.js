const Todo = require("../Model/todo");
const getallitems = require("../Services/todo");

exports.additem = async (req, res, next) => {
  try {
    const title = req.body.title;
    const user = req.user;
    const page = req.query.page || 1;
    // const description = req.body.description;

    const tododata = await user.createTodolist({
      title: title,
      // description: description,
    });

    const { items, totalcount } = await getallitems(user.id, page);
    res.status(200).json({
      todo: items,
      message: "new list.",
      totalcount: totalcount,
    });
  } catch (err) {
    res.status(500).json({ error: err, message: "failed" });
  }
};

//get all items
exports.getall = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const { items, totalcount } = await getallitems(req.user.id, page);

    res
      .status(200)
      .json({ todo: items, message: "Retrieved all items.", totalcount });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err, message: "Failed to retrieve items." });
  }
};

//update

exports.updateitem = async (req, res, next) => {
  // console.log("inside update", itemId);
  try {
    const itemId = req.query.id;
    const page = req.query.page || 1;
    const todoitem = await req.user.getTodolists({ where: { id: itemId } });
    const data = await todoitem[0].update({
      title: req.body.title,
      // description: req.body.description,
    });
    // console.log("page", page);

    const { items, totalcount } = await getallitems(req.user.id, page);
    res.status(200).json({
      todo: items,
      message: "updated list.",
      totalcount: totalcount,
    });
    // res.status(200).json({ message: "Item updated successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message, message: "Failed to update item." });
  }
};

//delete

exports.deleteitem = async (req, res, next) => {
  // console.log("delete item");
  try {
    const itemId = req.query.id;
    const page = req.query.page || 1;
    const todoitem = await req.user.getTodolists({ where: { id: itemId } });
    await todoitem[0].destroy();
    const { items, totalcount } = await getallitems(req.user.id, page);
    res.status(200).json({
      todo: items,
      message: "updated all items.",
      totalcount: totalcount,
    });
  } catch (err) {
    // console.log(err);
    res
      .status(500)
      .json({ error: err.message, message: "Failed to delete item." });
  }
};

// res.status(200).json(data);
// const updatedItem = await Todo.update({
//     title: req.body.title,
//     description: req.body.description,
//   })
//   {
//     title: req.body.title,
//     description: req.body.description,
//   },
//   {
//     where: { id: itemId },
//   }
// );
