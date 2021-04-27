const { getUserData } = require("../controllers/user");
const { verifyToken, getUserColletion } = require("../controllers/validations/verifys");

const router = require("express").Router();





router.get('/',verifyToken,getUserColletion,getUserData)



module.exports = router;

