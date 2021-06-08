const { getUserData, updateUserImage, updateUserData,addReview,addRating } = require("../controllers/user");
const { verifyToken, getUserColletion, checkIDparams } = require("../controllers/validations/verifys");

const router = require("express").Router();



router.get('/checkToken',verifyToken,(req,res)=>{return res.status(200).send("Token Verifyed")})


router.put('/updateImage',verifyToken,getUserColletion,updateUserImage)
router.put('/updateUserData',verifyToken,getUserColletion,updateUserData)


//*For instruktors Only no need to find userColletion
router.put('/:id/addReview',verifyToken,checkIDparams,getUserColletion,addReview)
router.put('/:id/rate',verifyToken,checkIDparams,getUserColletion,addRating)

//Public
router.get('/:id',checkIDparams,getUserColletion,getUserData)


//private
router.get('/',verifyToken,getUserColletion,getUserData)


module.exports = router;

