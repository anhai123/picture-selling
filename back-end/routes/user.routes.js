const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
// const general = require("./generalController");
module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   res.header(
  //     "Access-Control-Allow-Methods",
  //     "GET, DELETE"
  //   ); // If needed
  //   next();
  // });

  app.get("/api/shopping/all", controller.allAccess);

  app.get("/api/shopping/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/shopping/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/shopping/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/shopping/user/information",
    [authJwt.verifyToken],
    controller.getUser
  );
  app.patch(
    "/api/shopping/user/add_cart",
    [authJwt.verifyToken],
    controller.addCart
  );
  app.get(
    "/api/shopping/user/history",
    [authJwt.verifyToken],
    controller.history
  );
  app.get(
    "/api/shopping/user/historyType",
    [authJwt.verifyToken],
    controller.historyType
  );
};
