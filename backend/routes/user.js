const { getUserData, updateUserImage, updateUserData } = require("../controllers/user");
const { verifyToken, getUserColletion, checkIDparams } = require("../controllers/validations/verifys");

const router = require("express").Router();





router.get('/',verifyToken,getUserColletion,getUserData)
router.get('/:id',checkIDparams,getUserColletion,getUserData)
router.put('/updateImage',verifyToken,getUserColletion,updateUserImage)
router.put('/updateUserData',verifyToken,getUserColletion,updateUserData)



module.exports = router;

