const config = require("../config/auth.config");
const db = require("../models");
const Status = require("../models/status.model");
const Products = db.product;
const Payments = db.payment;
const Users = db.user;
var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const general = require("./generalController");

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

exports.createPayment = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const user = await Users.findById(req.userId).select("username email");
    if (!user) {
      return res.status(404).json({ code:44, message: "User does not exist!" });
    }

    const { cart, address } = req.body;
    const { _id, username, email } = user;

    Status.find(
      {
        name: "Đang xác nhận",
      },
      async (err, statusR) => {
        if (err) {
          res.status(500).send({ code:50, message: err });
          return;
        }
        
        var newPayment = new Payments({
          user_id: _id,
          name: username,
          email,
          status: statusR.at(0)._id,
          cart,
          address,
        });

        cart.filter((item) => {
          return sold(item._id, item.quantity, item.sold);
        });

        await newPayment.save();
        return res.json({ code:0, message: "Payment Success!" });
      }
    );
  } catch (err) {
    return res.status(500).json({ code:50, message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const payments = await Payments.find();
    return res.json(payments);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const { _id, status } = req.body;

    Status.find(
      {
        name: status,
      },
      async (err, statusR) => {
        if (err) {
          res.status(500).send({ code:50, message: err });
          return;
        }

        await Payments.findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            status: statusR.at(0)._id
          }
        ).then(function (paymentsR, err) {
          if (err) {
            res.status(500).send({ code:50, message: err });
            return;
          }
          return res.json({ code:0, message: "Updated success!" });
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ code:50, message: error.message });
  }
};
