const { lading } = require("../controllers/landingController");

const router = require("express").Router();



router.get("/",lading)  


module.exports = router;