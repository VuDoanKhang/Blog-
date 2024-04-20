const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  image: String,
  username: String,
  datePosted: {
    /* can declare property type with an object like this becau
se we need 'default' */
    type: Date,
    default: new Date(),
  },
});
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
