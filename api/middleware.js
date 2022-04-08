//user will be granted access to the grades only if a valid token is provied.

const jwt = require("jsonwebtoken");

const JWT_SECRET = "jwt_secret_password";

module.exports = (req, res, next) => {
  //checking header or url parameters or post parameters for token
  let token =
    req.body["x-access-token"] ||
    req.query["x-access-token"] ||
    req.headers["x-access-token"];

  //decoding token
  if (token) {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Failed to authenticate token",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //if no token, it'll return an error
    return res.status(403).send({
      success: false,
      message: "No token provided",
    });
  }
};
