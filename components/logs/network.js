const express = require("express");
const router = express.Router();
const passport = require("passport");

const { success, error } = require("../../network/response");
const { list, add } = require("./controller");
require("../../utils/auth/strategies/jwt");
const validationHandler = require("../../utils/middlewares/validationHandler");

router.get("/", (req, res) => {
  list()
    .then(data => {
      success(req, res, data, 200);
    })
    .catch(err => {
      error(req, res, "Internal error", 500, err);
    });
});
router.get("/action", (req, res) => {
  let q = req.query.q || null;
  list(q)
    .then(data => {
      success(req, res, data, 200);
    })
    .catch(err => {
      error(req, res, "Internal error", 500, err);
    });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler(),
  (req, res) => {
    add(req.body.action, req.user.id)
      .then(data => {
        success(req, res, data, 200);
      })
      .catch(err => {
        error(req, res, err, 500, err);
      });
  }
);

module.exports = router;
