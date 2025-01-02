const express = require('express');
const multer = require('multer');
const { updateBlogPost } = require('../controller/blog/updateBlogPost');
const { createBlogPost } = require('../controller/blog/createBlogPost');
 const { deleteBlogPost } = require('../controller/blog/deteteBlogPost');
 const { getAllBlogs  } = require('../controller/blog/getBlogPost');
const { login, registerUser } = require('../controller/loginController');
const {loginUser} =require('../controller/loginController');
const { sendEmailOtp } = require('../controller/blog/otpController');
 
const upload = multer({ storage: multer.memoryStorage() });


const router = express.Router();





router.post('/createBlogPost',   upload.single('blog_img'),  createBlogPost);

router.post('/updateBlogPost',    updateBlogPost);

router.post('/deleteBlogPost',    deleteBlogPost);

router.get('/getAllBlogs',    getAllBlogs );
router.post('/adminlogin',    login );
router.post('/registerUser',   registerUser );
router.post('/loginUser',    loginUser );
router.post('/sendOtp', sendEmailOtp);
module.exports = router; 
