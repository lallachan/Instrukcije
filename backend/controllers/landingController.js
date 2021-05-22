const { userAuth, Instruktor } = require("../models/User_Auth");

exports.lading = async (req, res) => {
  try {
    const IL = await Instruktor
    .find({})
    .select(["-password", "-emailVerifed", "-__v","-comments","-date","-reviewedUsers","-ratedUsers"])
    .sort({ rating: -1 })
    .limit(8);

    res.status(200).send(IL);
  } catch (err) {
    res.status(401).send(err);
  }
};
