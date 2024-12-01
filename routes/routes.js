const express = require('express');
const multer = require('multer');
const { updateBlogPost } = require('../controller/blog/updateBlogPost');
const { createBlogPost } = require('../controller/blog/createBlogPost');
const { readBlogPosts } = require('../controller/blog/getBlogPost');
const { deleteBlogPost } = require('../controller/blog/deteteBlogPost');
 
const upload = multer({ storage: multer.memoryStorage() });


const router = express.Router();





router.post('/createBlogPost',   upload.single('blog_img'),  createBlogPost);

router.post('/updateBlogPost',    updateBlogPost);

router.post('/deleteBlogPost',    deleteBlogPost);

router.post('/readBlogPosts',    readBlogPosts);
module.exports = router; 
