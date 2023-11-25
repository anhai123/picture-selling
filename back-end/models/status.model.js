const mongoose = require("mongoose");

const Status = mongoose.model(
  "Status",
  new mongoose.Schema({
    name: mongoose.Schema.Types.String,
  })
);

module.exports = Status;
