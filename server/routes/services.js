const router = require("express").Router();
const CheckAuthRole = require("../middleware/CheckAuthRole");
const Services = require("../database/schema/services.schema");

router.get("/fetch-items", async (req, res) => {
  const items = await Services.find({});
  res.json(items);
});

router.get("/fetch-items/:id", async (req, res) => {
  const item = await Services.findOne({ _id: req.params.id });
  res.json(item);
});

router.post("/new-item", CheckAuthRole, async (req, res) => {
  try {
    const { item, status, categoryItem, price } = req.body;
    console.log({item, status, categoryItem, price})
    if (!item || !status || !categoryItem || !price)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const newItem = new Services({
      item,
      status,
      categoryItem,
      price,
    });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", CheckAuthRole, async (req, res) => {
  const { item, status, categoryItem, price } = req.body;
  const isItem = await Services.findOne({ _id: req.params.id });
  if (!isItem) return res.status(400).json({ msg: "No item found !!" });
  const updateItem = await Services.findByIdAndUpdate(
    { _id: isItem._id },
    { item, status, categoryItem, price },
    { new: true }
  );
  res.json(updateItem);
});

router.delete("/delete/:id", CheckAuthRole, async (req, res) => {
  const item = await Services.findOne({ _id: req.params.id });
  if (!item) return res.status(400).json({ msg: "No item found !!" });
  const deletedItem = await Services.findByIdAndDelete(item._id);
  res.json(deletedItem);
});

module.exports = router;
