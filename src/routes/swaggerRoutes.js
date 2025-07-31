const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");
const passport = require("passport");
router.get("/login", passport.authenticate("github"));

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
router.use("/api-docs", swaggerUI.serve);
router.use("/api-docs", swaggerUI.setup(swaggerDocument));

module.exports = router;
