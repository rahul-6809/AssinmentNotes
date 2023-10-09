const jwt = require("jsonwebtoken");

const authAuthentication = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: false, message: "In catch Auth failed", error });
  }
};

module.exports = authAuthentication;
