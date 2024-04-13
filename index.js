const express = require('express')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = new express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
//Đăng ký thư mục public
app.use(express.static('public'))

// thiết lập view engine là EJS
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/')
    .then(() => {
        console.log("connect DB")
    })


const newUserController = require('./controllers/newUser')
app.get('/auth/register', newUserController)
const storeUserController = require('./controllers/storeUser')
app.post('/users/register', storeUserController)


const loginController = require('./controllers/login')
app.get('/auth/login', loginController);
const loginUserController = require('./controllers/loginUser')
app.post('/users/login', loginUserController)

// ---------------------------------------- check-----------------------
const BlogPost = require('./models/BlogPost')
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
//----------------------------------------------------------------------------

const getPostController = require('./controllers/getPost')
//Hiển thị chi tiết bài đăng
app.get('/post/:id', getPostController)

const homeController = require('./controllers/home')
app.get('/', homeController)


const newPostController = require('./controllers/newPost')
app.get('/posts/new', newPostController)
const storePostController = require('./controllers/storePost')
app.post('/posts/store', storePostController)


app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/samplepost', (req, res) => {
    res.render('samplepost')
})



app.listen(4000)
