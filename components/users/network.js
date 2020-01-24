const express = require("express");
const router = express.Router();
const passport = require("passport");
const { success, error } = require("../../network/response");
const { list, add, edit, deleteU } = require("./controller");
require("../../utils/auth/strategies/jwt");
const validationHandler = require("../../utils/middlewares/validationHandler");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler(),
  (req, res) => {
    list(req.user)
      .then(data => {
        success(req, res, data, 200);
      })
      .catch(err => {
        error(req, res, err.message, 500, err);
      });
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler(),
  (req, res) => {
    add(req.body)
      .then(data => {
        success(req, res, data, 200);
      })
      .catch(err => {
        error(req, res, err, 500, err);
      });
  }
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler(),
  (req, res) => {
    edit(req.body)
      .then(data => {
        success(req, res, data, 200);
      })
      .catch(err => {
        error(req, res, err, 500, err);
      });
  }
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  validationHandler(),
  (req, res) => {
    deleteU(req.body)
      .then(data => {
        success(req, res, data, 200);
      })
      .catch(err => {
        error(req, res, err, 500, err);
      });
  }
);
module.exports = router;
