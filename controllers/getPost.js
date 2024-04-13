const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    try {
        const detailPost = await BlogPost.findById(req.params.id)
        if (detailPost) {
            res.render('post', { detailPost })
        }
    } catch (err) {
        console.log(err)
    }

}