const { getUserData, updateUserImage, updateUserData } = require("../controllers/user");
const { verifyToken, getUserColletion } = require("../controllers/validations/verifys");

const router = require("express").Router();





router.get('/',verifyToken,getUserColletion,getUserData)
router.put('/updateImage',verifyToken,getUserColletion,updateUserImage)
router.put('/updateUserData',verifyToken,getUserColletion,updateUserData)



module.exports = router;

