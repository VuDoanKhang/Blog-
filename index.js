const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path");
const app = new express();
//Khai báo express-fileupload
const fileupload = require("express-fileupload");
const expressSession = require("express-session");
const authMiddleware = require("./middleware/authMiddleware");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware");
const logoutController = require("./controllers/logout");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: "keyboard cat",
  })
);

global.loggedIn = null;
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});

app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//Đăng ký thư mục public
app.use(express.static("public"));

// thiết lập view engine là EJS
app.set("view engine", "ejs");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/").then(() => {
  console.log("connect DB");
});

const newUserController = require("./controllers/newUser");
app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);
const storeUserController = require("./controllers/storeUser");
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController
);

const loginController = require("./controllers/login");
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
const loginUserController = require("./controllers/loginUser");
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleware,
  loginUserController
);

app.get("/auth/logout", logoutController);

// ---------------------------------------- check-----------------------
const BlogPost = require("./models/BlogPost");
// Tạo danh sách bài đăng
// app.get("/posts/new", async (req, res) => {
//   try {
//     const blogposts = await BlogPost.find({}); // Lấy danh sách các bài đăng
//     res.render("create", { blogposts: blogposts }); // Truyền danh sách bài đăng vào template
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });
// //-------------------------------------------x---------------------------------

const getPostController = require("./controllers/getPost");
//Hiển thị chi tiết bài đăng
app.get("/post/:id", getPostController);

const homeController = require("./controllers/home");
app.get("/", homeController);

//-----------------------------------
const newPostController = require("./controllers/newPost");
app.get("/posts/new", authMiddleware, newPostController);

const storePostController = require("./controllers/storePost");
app.post("/posts/store", authMiddleware, storePostController);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/samplepost", (req, res) => {
  res.render("samplepost");
});

app.use((req, res) => res.render("notfound"));

//-------------------------------------\

//-----------------------------------
app.listen(4000);
