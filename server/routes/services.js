const router = require("express").Router();
const CheckAuth = require("../middleware/CheckAuth");
const services = require("../database/schema/services.schema");

router.get("/fetch-items", async (req, res) => {
  const items = await services.find({});
  res.json(items);
});

router.get("/fetch-items/:id", async (req, res) => {
  const item = await services.findOne({ _id: req.params.id });
  res.json(item);
});

router.post("/new-item", async (req, res) => {
  try {
    const { item, status, categoryItem, price } = req.body;
    console.log({item, status, categoryItem, price})
    if (!item || !status || !categoryItem || !price)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const newItem = new services({
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

router.put("/update/:id", async (req, res) => {
  const { item, status, categoryItem, price } = req.body;
  const isItem = await services.findOne({ _id: req.params.id });
  if (!isItem) return res.status(400).json({ msg: "No item found !!" });
  const updateItem = await services.findByIdAndUpdate(
    { _id: isItem._id },
    { item, status, categoryItem, price },
    { new: true }
  );
  res.json(updateItem);
});

router.delete("/delete/:id", async (req, res) => {
  const item = await services.findOne({ _id: req.params.id });
  if (!item) return res.status(400).json({ msg: "No item found !!" });
  const deletedItem = await services.findByIdAndDelete(item._id);
  res.json(deletedItem);
});

module.exports = router;
