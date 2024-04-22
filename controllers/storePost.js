const BlogPost = require("../models/BlogPost.js");
const path = require("path");

module.exports = async (req, res) => {
  try {
    let image = req.files.image;
    await image.mv(path.resolve(__dirname, "../public/upload", image.name));
    const imagePath = "/upload/" + image.name;
    await BlogPost.create({ ...req.body, image: imagePath });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
