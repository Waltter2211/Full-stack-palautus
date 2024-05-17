const jwt = require("jsonwebtoken");

const jwtVerifier = async (req, res, next) => {
  const authorizationToken = req.get("authorization");

  if (
    authorizationToken &&
    authorizationToken.toLowerCase().startsWith("bearer")
  ) {
    try {
      req.decodedToken = jwt.verify(
        authorizationToken.substring(7),
        process.env.JWT_SECRET
      );
      console.log(req.decodedToken);
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "token invalid" });
    }
  } else {
    return res.status(401).send({ error: "token missing" });
  }
  next();
};

module.exports = jwtVerifier