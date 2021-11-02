require("dotenv").config();
const { User } = require("../../models/users/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  const doc = await User.findOne({ email: email });
  if (doc === null) {
    return res.status(400).send("Usuario no encontrado");
  }
  try {
    if (await bcrypt.compare(password, doc.password)) {
      const token = jwt.sign(doc.toObject(), process.env.SECRET_TOKEN);
      res.status(200).json({ token: token, user: doc });
    } else {
      res.status(401).send("Email or Password invalid");
    }
  } catch {
    res.status(500).send("New Error");
  }
};

module.exports = LoginController;