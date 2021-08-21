const Dashboard = require("../database/schema/dashboard.schema");

function ordersForThisMonth() {
  setInterval(async () => {
    let dashboard = await Dashboard.findOne({});
    let monthEndAt = dashboard.dates.monthEndAt;

    if (new Date().getTime() > monthEndAt) {
      dashboard.orders.totalOfOrdersForThisMonth = 0;
      dashboard.markModified("orders.totalOfOrdersForThisMonth");
      dashboard.dates.monthEndAt == new Date().getTime() + 2629800000;
      dashboard.markModified("dates.monthEndAt");
      dashboard.save();

      console.log("Orders data for this month has been reset");
    }
  }, 1000 * 60);
}

function ordersForThisTheWeek() {
  setInterval(async () => {
    const dashboard = await Dashboard.findOne({});
    const weekEndAt = dashboard.dates.weekEndAt;

    if (new Date().getTime() > weekEndAt) {
      dashboard.orders.totalOfOrdersForThisWeek = 0;
      dashboard.markModified("orders.totalOfOrdersForThisWeek");
      dashboard.dates.weekEndAt == new Date().getTime() + 604800000;
      dashboard.markModified("dates.weekEndAt");
      dashboard.save();

      console.info("Orders data for this week has been reset");
    }
  }, 1000 * 60);
}

function accountsForThisMonth() {
  setInterval(async () => {
    const dashboard = await Dashboard.findOne({});
    const monthEndAt = dashboard.dates.monthEndAt;

    if (new Date().getTime() > monthEndAt) {
      dashboard.accounts.totalOfAccountsForThisMonth = 0;
      dashboard.markModified("accounts.totalOfAccountsForThisMonth");
      dashboard.save();

      console.info("Accounts data for this week has been reset");
    }
  }, 1000 * 60);
}

function accountsForThisTheWeek() {
  setInterval(async () => {
    const dashboard = await Dashboard.findOne({});
    const weekEndAt = dashboard.dates.weekEndAt;

    if (new Date().getTime() > weekEndAt) {
      dashboard.accounts.totalOfAccountsForThisWeek = 0;
      dashboard.markModified("accounts.totalOfAccountsForThisWeek");
      dashboard.save();

      console.info("Accounts data for this week has been reset");
    }
  }, 1000 * 60);
}

function earningsForThisMonth() {
  setInterval(async () => {
    const dashboard = await Dashboard.findOne({});
    const monthEndAt = dashboard.dates.monthEndAt;

    if (new Date().getTime() > monthEndAt) {
      dashboard.earnings.totalOfEarningsForThisMonth = 0;
      dashboard.markModified("earnings.totalOfEarningsForThisMonth");
      dashboard.save();

      console.info("Earnings data for this month has been reset");
    }
  }, 1000 * 60);
}

function earningsForThisTheWeek() {
  setInterval(async () => {
    const dashboard = await Dashboard.findOne({});
    const weekEndAt = dashboard.dates.weekEndAt;

    if (new Date().getTime() > weekEndAt) {
      dashboard.earnings.totalOfEarningsForThisWeek = 0;
      dashboard.markModified("earnings.totalOfEarningsForThisWeek");
      dashboard.save();

      console.info("Earnings data for this week has been reset");
    }
  }, 1000 * 60);
}

function autoRun() {
  ordersForThisMonth();
  ordersForThisTheWeek();
  accountsForThisMonth();
  accountsForThisTheWeek();
  earningsForThisMonth();
  earningsForThisTheWeek();
}

module.exports = { autoRun };
