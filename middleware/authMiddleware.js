const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    console.log("sdfdfdfsdfsdf");
    const user = await User.findById(req.session.userId);
    console.log({ dsfdsf: user });
    if (!user) return res.redirect("/");
    next();
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};
