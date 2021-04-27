const router = require("express").Router();
const {registerUser, loginUser,validateEmail, registerInstruktor} = require("../controllers/userAuth");
const { emailConfirmation, getUserColletion } = require("../controllers/validations/verifys");




router.post('/register',registerUser)
router.get('/register/confirmation/:token',emailConfirmation,getUserColletion,validateEmail)
router.get('/registerInstruktor/confirmation/:token',emailConfirmation,getUserColletion,validateEmail)
router.post('/registerInstruktor',registerInstruktor)
router.post('/login',loginUser)



module.exports = router;
