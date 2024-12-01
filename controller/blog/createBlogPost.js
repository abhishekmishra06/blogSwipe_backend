const BlogPost = require("../../models/blogPostModel");
const { sendGeneralResponse } = require("../../utils/responseHelper");
const { uploadImage } = require("../../utils/uploadImages");
 
const createBlogPost = async (req, res) => {
  if (!req.body) {
    return sendGeneralResponse(res, false, "Request body is missing", 400);
  }

  const { title, content, category } = req.body;


 
  if (!title) {
    return sendGeneralResponse(res, false, "Title is required", 400);
  }
  if (!content) {
    return sendGeneralResponse(res, false, "Content is required", 400);
  }
  if (!category) {
    return sendGeneralResponse(res, false, "Category is required", 400);
  }

  if (!req.file) {
    return sendGeneralResponse(res, false, "blog image is required", 400);
  }

  try {
    let blog_img_url = null;
    if (req.file) {
      blog_img_url = await uploadImage(
        req.file.buffer,
        'blog_img' + Date.now()
      );
    }

    const newBlogPost = new BlogPost({
      title,
      content,
      category,
      blog_img: blog_img_url,
      createdAt: Date.now(),
    });

    await newBlogPost.save();

    sendGeneralResponse(
      res,
      true,
      "Blog post created successfully",
      201,
      newBlogPost
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    sendGeneralResponse(res, false, "Internal server error", 500);
  }
};

module.exports = { createBlogPost };
