const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      rquired: [true, "password is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
