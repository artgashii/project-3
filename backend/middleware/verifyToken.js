const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
      const token = authorizationHeader.split(" ")[1];
      const verify = jwt.verify(token, process.env.SECRET_TOKEN);

      if (verify) {
        req.user = verify;
        next();
      }
    } else {
      res.status(401).send("Invalid authorization header");
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).send("Invalid token");
    } else {
      console.error(error);
      res.status(500).send("Internal server error!");
    }
  }
};

module.exports = verifyToken;
