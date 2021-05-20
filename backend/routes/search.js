const { seachInstruktors } = require("../controllers/search");

const router = require("express").Router();


router.post("/",seachInstruktors)

module.exports = router;
