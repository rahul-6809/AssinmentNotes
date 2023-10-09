const express = require("express");
const router = express.Router();
const {
  registrationController,
  loginController,
  Userlogout,
} = require("../Controllers/authControllers");
const authAuthentication = require("../Middleware/authMiddleware");

router.post("/register", registrationController);
router.post("/login", loginController);
router.get("/logout", authAuthentication, Userlogout);

//router.get('/notes', authAuthentication, getNotes)

module.exports = router;
