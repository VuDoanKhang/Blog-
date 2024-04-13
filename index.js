const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = new express()
const newUserController = require('./controllers/newUser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/')
    .then(() => {
        console.log("connect DB")
    })
// .then(() => {
//     // Tạo một bài đăng mới
//     return BlogPost.create({
//         title: 'Đây là tài liệu dạy học lập trình Node.js từ cơ bản',
//         body: 'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là tài liệu giành cho bạn'
//     });
// })

app.get('/auth/register', newUserController)

const storeUserController = require('./controllers/storeUser')
app.post('/users/register', storeUserController)

const loginController = require('./controllers/login')
app.get('/auth/login', loginController);

const loginUserController = require('./controllers/loginUser')
app.post('/users/login', loginUserController)

//Tạo danh sách bài đăng
app.get('/posts/new', async (req, res) => {
    try {
        const blogposts = await BlogPost.find({}); // Lấy danh sách các bài đăng
        res.render('create', { blogposts: blogposts }); // Truyền danh sách bài đăng vào template
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//Hiển thị chi tiết bài đăng
app.get('/post/:id', (req, res) => {
    // Tìm bài đăng trong cơ sở dữ liệu bằng id được cung cấp
    BlogPost.findById(req.params.id)
        .then(detailPost => {
            // Nếu không có lỗi, hiển thị bài đăng chi tiết
            res.render('post', {
                detailPost: detailPost // Truyền dữ liệu của bài đăng đến view
            })
        })
        .catch(err => {
            console.log(err) // Xử lý lỗi nếu có
            res.redirect('/') // Chuyển hướng về trang chủ hoặc trang lỗi khác
        })
})


const BlogPost = require('./models/BlogPost.js')


//Đăng ký thư mục public
app.use(express.static('public'))

// thiết lập view engine là EJS
app.set('view engine', 'ejs')

// Chỉ định thư mục chứa tập view
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/samplepost', (req, res) => {
    res.render('samplepost')
})


app.get('/posts/new', (req, res) => {
    res.render('create')
})

// điều hướng vào index
app.post('/posts/store', (req, res) => {
    // model creates a new doc with browser data
    // console.log(req.body)
    BlogPost.create(req.body)
    res.redirect('/index')

})

// Hiển thị tất cả bài viết ở trang blog
// app.get('/index', (request, response) => {
//     BlogPost.find({})
//         .then(posts => {
//             console.log('Tất cả các blog post:', posts)
//             // Phản hồi với trang chính và truyền các bài đăng vào để hiển thị
//             response.render('index', { posts: posts })
//         })
//         .catch(error => {
//             console.error('Lỗi khi tìm kiếm bài đăng:', error)
//             response.status(500).send('Đã xảy ra lỗi khi tìm kiếm bài đăng')
//         })
// })

//or đoạn code này
// .then(() => {
//     // Tìm kiếm và hiển thị tất cả các blog post
//     return BlogPost.find({});
// })
// .then(blogposts => {
//     console.log('Tất cả các blog post:', blogposts)})
//khởi động server 

app.get('/index', async (request, response) => {
    try {
        const posts = await BlogPost.find({});
        console.log(posts);
        response.render('index', { blogposts: posts });
    } catch (error) {
        console.log(error);
        response.status(500).send('Internal Server Error');
    }
});

app.listen(4000)
