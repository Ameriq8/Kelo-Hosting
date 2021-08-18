const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
    item: {type: String, required: true},
    status: {type: Boolean, required: true},
    categoryItem: {type: String, required: true},
    price: {type: Number, required: true},
})

module.exports = model('services', serviceSchema)