const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.cookies.token || "";
  try {
    if (!token) {
      return res.status(401).json("You need to Login 👽");
    }
    const decrypt = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decrypt;
    next();
  } catch (err) {
    return res.status(500).send("You need to Login 👻 ");
  }
};
