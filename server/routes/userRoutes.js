const { login, register, setProfil, getAllUsers } = require("../controllers/userController");

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.post('/setAvatar/:id', setProfil)
router.post('/users/:id', getAllUsers)

module.exports = router;