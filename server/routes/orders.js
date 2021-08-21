const router = require("express").Router();
const CheckAuth = require("../middleware/CheckAuth");
const Orders = require("../database/schema/orders.schema");

router.get("/fetch-orders/:sortType", CheckAuth, async (req, res) => {
  const orders = await Orders.find({ _id: req.user._id });

  switch (req.params.sortType) {
    case "big-price":
      orders.sort((a, b) => {
        return b.price - a.price;
      });
      res.json(orders);
      break;

    case "new-to-old":
      orders.sort((a, b) => {
        return b.date - a.date;
      });
      res.json(orders);
      break;

    case "old-to-new":
      orders.sort((a, b) => {
        return a.date - b.date;
      });
      res.json(orders);
      break;

    default:
      orders.sort((a, b) => {
        return b.price - a.price;
      });
      res.json(orders);
      break;
  }
});

router.post("/new-order", CheckAuth, async (req, res) => {
  try {
    const { itemId, price } = req.body;
    const userId = req.user._id;
    const date = new Date().getTime();

    if (!itemId)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const newOrder = new Orders({
      userId,
      itemId,
      status: "In queue",
      price,
      date,
    });
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
