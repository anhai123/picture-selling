const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comments",
  new mongoose.Schema(
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },

      name: {
        type: String,
      },
      content: {
        type: String,
      },
      star: {
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Comment;
