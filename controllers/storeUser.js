const User = require('../models/User.js')

module.exports = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.redirect('/')
    }
    catch (err) {
        console.log(err)
        return res.redirect('/auth/register')
    }
}

