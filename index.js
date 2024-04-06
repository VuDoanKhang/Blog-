const express = require('express')
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://db1:123@cluster0.ajbeedx.mongodb.net/')
const app = new express()
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
//khởi động server 
app.listen(4000)