const router = require("express").Router();
const {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", auth, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
