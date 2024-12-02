const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    blog_img: { type: String, required: true },

    createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;  