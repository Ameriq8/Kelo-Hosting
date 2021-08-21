const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = model("orders", orderSchema);
