const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema(
    {
      title: String,
      price: Number,
      description: String,
      content: String,
      images: String,
      category: String,
      checked: Boolean,
      sold: {
        type: Number,
        default: 0,
      },
      star: {
        type: Number,
        default: 0,
      },
      numReviews: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Product;
