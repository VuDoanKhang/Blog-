const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = new express()

mongoose.connect('mongodb+srv://db1:123@cluster0.ajbeedx.mongodb.net/')

const BlogPost = require('./models/BlogPost.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
//Đăng ký thư mục public
app.use(express.static('public'))

// thiết lập view engine là EJS
app.set('view engine','ejs')

// Chỉ định thư mục chứa tập view
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) =>{
    res.render('index')
    })

app.get('/about',(req, res) =>{
    res.render('about')
})

app.get('/contact', (req,res) =>{
    res.render('contact')
})

app.get('/post',(req, res) =>{
    res.render('post')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

// app.post('/posts/store', (req, res) => {
//     console.log(req.body)
//     res.redirect('/')
// })

app.post('/posts/store', (req, res) => {
    // model creates a new doc with browser data
    console.log(req.body)
    BlogPost.create(req.body)
    res.redirect('/')
    
})

//khởi động server 
app.listen(4000)
