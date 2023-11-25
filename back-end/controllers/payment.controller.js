const config = require("../config/auth.config");
const db = require("../models");
const Status = require("../models/status.model");
const Products = db.product;
const Payments = db.payment;
const Users = db.user;
var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const general = require("./generalController");

exports.getPayments = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const payments = await Payments.find();
    return res.json(payments);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.createPayment = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const user = await Users.findById(req.userId).select("username email");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const { cart, address } = req.body;
    const { _id, username, email } = user;

    Status.find(
      {
        name: "Đang xác nhận",
      },
      async (err, statusR) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        
        var newPayment = new Payments({
          user_id: _id,
          name: username,
          email,
          status: ObjectId(statusR._id),
          cart,
          address,
        });

        cart.filter((item) => {
          return sold(item._id, item.quantity, item.sold);
        });

        await newPayment.save();
        return res.json({ msg: "Payment Success." });
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};
