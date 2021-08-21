const { Schema, model } = require("mongoose");

const dashboardSchema = new Schema({
  settings: {
    type: Object,
    required: true,
    default: {
      websiteStatus: { type: Boolean, required: true, default: true },
      admins: { type: Array, required: true, default: [] },
    },
  },
  orders: {
    type: Object,
    required: true,
    default: {
      totalOfOrders: { type: Number, required: true, default: 0 },
      totalOfOrdersForThisMonth: { type: Number, required: true, default: 0 },
      totalOfOrdersForThisWeek: { type: Number, required: true, default: 0 },
    },
  },
  accounts: {
    type: Object,
    required: true,
    default: {
      totalOfAccounts: { type: Number, required: true, default: 0 },
      totalOfAccountsForThisMonth: { type: Number, required: true, default: 0 },
      totalOfAccountsForThisWeek: { type: Number, required: true, default: 0 },
    },
  },
  earnings: {
    type: Object,
    required: true,
    default: {
      totalOfEarnings: { type: Number, required: true, default: 0 },
      totalOfEarningsForThisMonth: { type: Number, required: true, default: 0 },
      totalOfEarningsForThisWeek: { type: Number, required: true, default: 0 },
    },
  },
  dates: {
    type: Object,
    required: true,
    default: {
      monthEndAt: { type: Date, required: true, default: new Date().getTime() },
      weekEndAt: { type: Date, required: true, default: new Date().getTime() },
    },
  },
});

module.exports = model("dashboard", dashboardSchema);
