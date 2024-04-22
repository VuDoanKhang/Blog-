const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (user) {
            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    req.session.userId = user?._id;
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        res.redirect('/auth/login');
    }
}