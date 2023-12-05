const config = require("../config/auth.config");
const db = require("../models");
const Status = require("../models/status.model");
const Products = db.product;
const Payments = db.payment;
const Users = db.user;
var ObjectId = require("mongodb").ObjectId;
const mongoose = require("mongoose");
const general = require("./generalController");
const moment = require("moment");

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
      return res.status(404).json({ code: 44, message: "User does not exist!" });
    }

    const { cart, address } = req.body;
    const { _id, username, email } = user;

    Status.find(
      {
        name: "Đang xác nhận",
      },
      async (err, statusR) => {
        if (err) {
          res.status(500).send({ code: 50, message: err });
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
        console.log('dong 51 creat payment')

        cart.filter((item) => {
          return sold(item._id, item.quantity, item.sold);
        });

        await newPayment.save();



        await Users.findOneAndUpdate(
          { _id: req.userId },
          {
            cart: []
          }
        );


        return res.json({ code: 0, message: "Payment Success!" });
      }
    );
  } catch (err) {
    return res.status(500).json({ code: 50, message: err.message });
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

exports.statistics = async (req, res) => {
  res = general.setResHeader(res);
  try {
    const today = moment().startOf('day');

    const payments = await Payments.find({
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
      }
    });
    var paymentsTotal = 0;
    for (let i = 0; i < payments.length; i++) {
      for (let j = 0; j < payments.at(i).cart.length; j++) {
        paymentsTotal += payments.at(i).cart.at(j).quantity * payments.at(i).cart.at(j).price;
      }
    }
    // return res.json(moment(payments.at(0).createdAt).format("YYYY/MM/DD HH:mm:ss"));

    // So luong khach hang moi
    const paymentsByUserId = await Payments.aggregate([
      {
        $match: {
          createdAt: {
            $gte: today.toDate(),
            $lte: moment(today).endOf('day').toDate()
          }
        }
      },
      {
        $group: {
          _id: '$user_id',
          count: { $sum: 1 }
        }
      }
    ]);
    var totalUserCount = paymentsByUserId.length;
    var newUserCount = totalUserCount;
    for (let i = 0; i < paymentsByUserId.length; i++) {
      const paymentsOld = await Payments.find({
        user_id: paymentsByUserId.at(i)._id,
        createdAt: {
          $lt: today.toDate()
        }
      });
      if (paymentsOld.length) {
        newUserCount--;
      }
    }

    // Doanh thu theo thang trong nam nay
    var paymentsTotalMonth = [];
    for (let i = 0; i <= 11; i++) {
      var totalMonth = 0;

      const thisMonth = moment().month(i).startOf('month');

      const paymentsByMonth = await Payments.find({
        createdAt: {
          $gte: thisMonth.toDate(),
          $lte: moment(thisMonth).endOf('month').toDate()
        }
      });

      for (let j = 0; j < paymentsByMonth.length; j++) {
        for (let k = 0; k < paymentsByMonth.at(j).cart.length; k++) {
          totalMonth += paymentsByMonth.at(j).cart.at(k).quantity * paymentsByMonth.at(j).cart.at(k).price;
        }
      }
      paymentsTotalMonth.push(totalMonth);
    }

    return res.json({
      code: 0,
      message: "Thành công!",
      data: {
        dailyRevenue: paymentsTotal,
        newUserCount: newUserCount,
        totalUserCount: totalUserCount,
        totalPaymentCount: payments.length,
        paymentsTotalMonth: paymentsTotalMonth,
      }
    });
  } catch (err) {
    return res.status(500).json({ code: 50, message: err.message });
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
          res.status(500).send({ code: 50, message: err });
          return;
        }

        await Payments.findOneAndUpdate(
          { _id: ObjectId(_id) },
          {
            status: statusR.at(0)._id
          }
        ).then(function (paymentsR, err) {
          if (err) {
            res.status(500).send({ code: 50, message: err });
            return;
          }
          return res.json({ code: 0, message: "Updated success!" });
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ code: 50, message: error.message });
  }
};
