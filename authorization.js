const secretKey = "akarshgupta";
const jwt = require("jsonwebtoken");

const verification = (req, res, next) => {
  const bearerToken = req.headers["authorization"];
console.log(bearerToken);
  if (!bearerToken) {
    return res.send({ msg: "Unauthorized person" });
  }

  const token = bearerToken.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.send({ msg: "Invalid token" });
    }

    // Store the decoded information in the request for further processing if needed
    req.user = decoded;

    next();
  });
};

module.exports = verification;