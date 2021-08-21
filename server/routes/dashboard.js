const router = require("express").Router();
const CheckAuthRole = require("../middleware/CheckAuthRole");
const Dashboard = require("../database/schema/dashboard.schema");
const User = require("../database/schema/user.schema");

router.get("/admins", CheckAuthRole, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({});

    res.status(200).json(dashboard.settings.admins);
  } catch (err) {
    console.log(err);
  }
});

router.post("/admins/add/:userId", CheckAuthRole, async (req, res) => {
  try {
    const { userId } = req.params;
    const dashboard = await Dashboard.findOne({});
    const user = await User.findOne({ _id: userId });

    dashboard.settings.admins.push(userId);
    dashboard.markModified("settings.admins");
    dashboard.save();

    res.status(200).json({ msg: `Done add admin role to ${user.userName}` });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/admins/remove/:userId", CheckAuthRole, async (req, res) => {
  try {
    const { userId } = req.params;
    const dashboard = await Dashboard.findOne({});
    const user = await User.findOne({ _id: userId });
    const admins = dashboard.settings.admins;

    for (let i = 0; i < admins.length; i++) {
      if (admins[i] == userId) {
        admins.splice(i, 1);
      }
    }
    dashboard.settings.admins == admins;
    dashboard.markModified("settings.admins");
    dashboard.save();

    res
      .status(200)
      .json({ msg: `Done remove admin role from ${user.userName}` });
  } catch (err) {
    console.log(err);
  }
});

router.post("/settings/website-status", CheckAuthRole, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({});
    let resMsg;

    (dashboard.settings.websiteStatus == dashboard.settings.websiteStatus) ===
    true
      ? false
      : true;
    dashboard.markModified("settings.websiteStatus");
    dashboard.save();

    dashboard.settings.websiteStatus === true
      ? resMsg == "The website now is opened to normal users"
      : resMsg == "The website now is closed to normal users";

    res.status(200).json({ msg: resMsg });
  } catch (err) {
    console.log(err);
  }
});

router.get("/orders/:dataType", CheckAuthRole, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({});

    switch (req.params.dataType) {
      case "totalOfOrders":
        res.status(200).json(dashboard.totalOfOrders);
        break;

      case "totalOfOrdersForThisMonth":
        res.status(200).json(dashboard.totalOfOrdersForThisMonth);
        break;

      case "totalOfOrdersForThisWeek":
        res.status(200).json(dashboard.totalOfOrdersForThisWeek);
        break;

      default:
        res.status(200).json(dashboard.totalOfOrders);
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/orders/:dataType", CheckAuthRole, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({});

    switch (req.params.dataType) {
      case "totalOfAccounts":
        res.status(200).json(dashboard.totalOfAccounts);
        break;

      case "totalOfAccountsForThisMonth":
        res.status(200).json(dashboard.totalOfAccountsForThisMonth);
        break;

      case "totalOfAccountsForThisWeek":
        res.status(200).json(dashboard.totalOfAccountsForThisWeek);
        break;

      default:
        res.status(200).json(dashboard.totalOfAccounts);
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/earnings/:dataType", CheckAuthRole, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({});

    switch (req.params.dataType) {
      case "totalOfEarnings":
        res.status(200).json(dashboard.totalOfEarnings);
        break;

      case "totalOfEarningsForThisMonth":
        res.status(200).json(dashboard.totalOfEarningsForThisMonth);
        break;

      case "totalOfEarningsForThisWeek":
        res.status(200).json(dashboard.totalOfEarningsForThisWeek);
        break;

      default:
        res.status(200).json(dashboard.totalOfEarnings);
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
