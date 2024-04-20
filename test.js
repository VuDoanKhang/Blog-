const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost:27017/");
//   .then(() => {
//     // Tạo một bài đăng mới
//     return BlogPost.create({
//       title: "Đây là tài liệu dạy học lập trình Node.js từ cơ bản",
//       body: "Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là tài liệu giành cho bạn",
//     });
//   })
//   .then(() => {
//     // Tìm kiếm và hiển thị tất cả các blog post
//     return BlogPost.find({});
//   })
//   .then((blogposts) => {
//     console.log("blog post đã được tạo:", blogposts);
//   })
// .catch(error => {
//     console.error('Lỗi:', error);
// })
// Cập nhật bài đăng
//   .then((blogposts) => {
//     console.log("Các blog post đã được tìm thấy:", blogposts);
//     // Cập nhật bài đăng
//     var idToUpdate = "6620c70a0fc58da81ac55763";
//     return BlogPost.findByIdAndUpdate(idToUpdate, { title: "Tiêu đề mới" });
//   })
//   .then((updatedBlogPost) => {
//     if (updatedBlogPost) {
//       console.log("Bài đăng đã được cập nhật:", updatedBlogPost);
//     } else {
//       console.log("Không tìm thấy bài đăng với ID:", idToUpdate);
//     }
//   })
// .catch((err) => {
//     console.error("Đã xảy ra lỗi:", err);
//   })

// Xóa bài đăng
//   .then(() => {
//     var id = "6620c6da7d65ab8d995a41c5";
//     return BlogPost.findByIdAndDelete(id);
//   })
//   .then((deleteBlogPost) => {
//     if (deleteBlogPost) {
//       console.log("Bài đăng đã được xóa", deleteBlogPost);
//     } else {
//       console.log("Không tìm thấy bài đăng với ID");
//     }
//   })
//   .catch((error) => {
//     console.error("Lỗi", error);
//   })
