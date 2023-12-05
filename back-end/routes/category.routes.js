const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");

module.exports = function (app) {
  // app.use(function (req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.get("/categories", controller.getCategories);
  app.post(
    "/categories",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createCategory
  );
  app.put(
    "/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateCategory
  );
  app.delete(
    "/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCategory
  );
};
