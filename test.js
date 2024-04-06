const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb+srv://db1:123@cluster0.ajbeedx.mongodb.net/se')
    // .then(() => {
    //     // Tạo một bài đăng mới
    //     return BlogPost.create({
    //         title: 'Đây là tài liệu dạy học lập trình Node.js từ cơ bản',
    //         body: 'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là tài liệu giành cho bạn'
    //     });
    // })
    // .then(() => {
    //     // Tìm kiếm và hiển thị tất cả các blog post
    //     return BlogPost.find({});
    // })
    // .then(blogposts => {
    //     console.log('Tất cả các blog post:', blogposts);

        // Cập nhật bài đăng
        // var idToUpdate = "661055f142dfda5a8ddaa3a3";
        // return BlogPost.findByIdAndUpdate(idToUpdate, { title: 'Tiêu đề mới' });
    // })
    // .then(updatedBlogPost => {
    //     if (updatedBlogPost) {
    //         console.log('Bài đăng đã được cập nhật:', updatedBlogPost);
    //     } else {
    //         console.log('Không tìm thấy bài đăng với ID:', idToUpdate);
    //     }
    // })
    .then(() =>{
        var id ="661055f142dfda5a8ddaa3a3"
        return BlogPost.findByIdAndDelete(id)
    })
    .then(deleteBlogPost =>{
        if(deleteBlogPost){
            console.log('Bài đăng đã được xóa', deleteBlogPost)
        }
        else{
            console.log('không tìm thấy bài đăng với ID', id)
        }
    })
    .catch(error => {
        console.error('Lỗi', error)
    })
    // .catch(error => {
    //     console.error('Lỗi:', error);
    // });
