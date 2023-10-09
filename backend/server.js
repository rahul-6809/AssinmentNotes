const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./Configs/db");
const cors = require("cors");
const morgan = require("morgan");
//  const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// app.use(express.static(path.join(__dirname, "../frontent/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontent/build/index.html"));
// });

app.use("/api/user", require("./Routes/authroutes"));
app.use("/api/note", require("./Routes/noteroutes"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white);
});
