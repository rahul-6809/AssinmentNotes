const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registrationController = async (req, res) => {
  try {
    const existanceUser = await userModel.findOne({ email: req.body.email });
    if (existanceUser) {
      res
        .status(200)
        .send({ status: false, mesaage: "email already register" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const user = await userModel.create(req.body);
      return res
        .status(200)
        .send({ status: true, message: "Registration Succesfully", user });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: false, message: "Error In Register API", err });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send({ status: false, message: "Wrong credatial" });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      res.status(500).send({ status: false, message: "Wrong credatial" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .send({ status: true, message: "Login Succesfull", user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, message: "Error In login API", err });
  }
};

const Userlogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send({ message: "Logged Out" });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  loginController,
  Userlogout,
  registrationController,
};
