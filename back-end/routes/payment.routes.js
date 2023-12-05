const { authJwt } = require("../middleware");
const controller = require("../controllers/payment.controller");

module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
  app.post("/payment", [authJwt.verifyToken], controller.createPayment);

  app.get(
    "/payment",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getPayments
  );

  app.get(
    "/statistics",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.statistics
  );

  app.put("/payment", [authJwt.verifyToken, authJwt.isAdmin], controller.updatePayment);
};
