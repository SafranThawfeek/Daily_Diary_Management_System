const router = require("express").Router();
const { register, login, changePassword } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/change-password", auth, changePassword);


module.exports = router;
