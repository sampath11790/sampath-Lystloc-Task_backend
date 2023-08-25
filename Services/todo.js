//get all items
const Todo = require("../Model/todo");
let getallitems = async (userId, page = 1, pageSize = 5) => {
  try {
    const { count, rows: allItems } = await Todo.findAndCountAll({
      where: { AuthId: userId },
      offset: (page - 1) * pageSize,
      limit: pageSize,
    });

    return {
      items: allItems,
      totalcount: Math.ceil(count / pageSize),
    };
  } catch (err) {
    throw err;
  }
};
module.exports = getallitems;
