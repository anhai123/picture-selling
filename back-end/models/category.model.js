const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema(
    {
      name: {
        type: String,

        trim: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Category;
