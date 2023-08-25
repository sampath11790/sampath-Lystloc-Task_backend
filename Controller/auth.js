const bcrypt = require("bcrypt");
const Auth = require("../Model/auth");
const JWT = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  //   res.send(req.body);
  const existingUser = await Auth.findOne({ where: { email: req.body.email } });

  if (existingUser) {
    // If user with the same email exists
    return res.status(400).json({ error: "Email already exists" });
  }
  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (!err) {
      const obj = {
        email: req.body.email,
        password: hash,
      };

      // res.json(obj);
      Auth.create(obj)
        .then(res.status(200).json({ message: "signup successful" }))
        .catch((err) => res.status(400).json({ error: "Enter valid data" }));
    } else {
      res.status(400).json({ error: "Enter valid data", messgae: err });
    }
  });
};

exports.login = async (req, res, next) => {
  try {
    const obj = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = await Auth.findAll({ where: { email: req.body.email } });
    // console.log("user", user);
    if (user.length > 0) {
      const isMatch = await bcrypt.compare(obj.password, user[0].password);
      console.log(isMatch);
      if (isMatch) {
        res.status(200).json({
          message: "login success",
          Token: getToken(user[0].id),
        });
      } else {
        res.status(400).json({ error: "Enter valid data ", message: err });
      }
    }
  } catch (err) {
    res.status(400).json({ error: " Enter valid data ", message: err });
  }
};

function getToken(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY);
}
