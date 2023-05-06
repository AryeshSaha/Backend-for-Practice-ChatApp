const jwt = require("jsonwebtoken");

const genToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = genToken;
