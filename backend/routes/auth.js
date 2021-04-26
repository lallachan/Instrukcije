const router = require("express").Router();
const {registerUser, loginUser,validateEmail, registerInstruktor} = require("../controllers/userAuth");




router.post('/register',registerUser)
router.get('/register/confirmation/:token',validateEmail)
router.post('/registerInstruktor',registerInstruktor)
router.post('/login',loginUser)



module.exports = router;
