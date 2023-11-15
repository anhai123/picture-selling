const mongoose = require("mongoose");

const Payment = mongoose.model(
  "Payments",
  new mongoose.Schema(
    {
      user_id: {
        type: String,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: Object,
      },

      status: {
        type: Boolean,
        default: false,
      },
      cart: {
        type: Array,
        default: [],
      },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Payment;
