const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(8).toString("hex");
};

module.exports = {
  generateToken,
};
