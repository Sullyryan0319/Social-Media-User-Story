const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  return next();
}

module.exports = admin;
