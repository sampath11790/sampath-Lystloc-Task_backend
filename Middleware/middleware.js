const JWT = require("jsonwebtoken");
const Auth = require("../Model/auth");

const tokenValidation = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const response = await JWT.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("response", response);
    const User = await Auth.findByPk(response.userId);

    if (User) {
      req.user = User;
      // console.log("auth success");
      next();
    } else {
      res.status(401).json({ error: User });
    }
  } catch (err) {
    res
      .status(401)
      .json({ error: "yor are not authorized to acceess this page" });
  }
};
module.exports = tokenValidation;
