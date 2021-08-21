const jwt = require("jsonwebtoken");
const Dashboard = require("../database/schema/dashboard.schema");

const CheckAuthRole = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    const dashboard = await Dashboard.findOne({}).settings.admins;
    const isAdmin = dashboard.find(admin => admin == req.user._id);
    if (isAdmin) {
      req.user = verified.id;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = CheckAuthRole;
