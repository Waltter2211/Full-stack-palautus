const jwt = require("jsonwebtoken");

const Session = require('../models/session')

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
      const userToken = await Session.findOne({ where: {user_token: authorizationToken.split(' ')[1]} })
      console.log(userToken)
      if (userToken) {
        next()
      } else {
        return res.status(401).send({ error: "user not authorized" })
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send({ error: "token invalid" });
    }
  } else {
    return res.status(401).send({ error: "token missing" });
  }
};

module.exports = jwtVerifier