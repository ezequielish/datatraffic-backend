const express = require("express");
const router = express.Router();
const { success, error } = require("../../network/response");
const { login, logout } = require("./controller");
const passport = require("passport");

require("../../utils/auth/strategies/jwt");
const validationHandler = require("../../utils/middlewares/validationHandler");
router.post("/", (req, res) => {
  login(req, res)
    .then(data => {
      success(req, res, data, 200);
    })

    .catch(err => {
      error(req, res, err, 500, err);
    });
});

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler(),
  (req, res) => {
    //   const { username, password } = req.headers;
    logout(req)
      .then(data => {
        success(req, res, data, 200);
      })

      .catch(err => {
        error(req, res, err.message, 500, err);
      });
  }
);
module.exports = router;
