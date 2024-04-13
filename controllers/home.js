const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    try {
        const posts = await BlogPost.find({})
        if (posts) {
            res.render('index', {
                blogposts: posts
            });
        }
    } catch (err) {
        console.log(err)
    }
}