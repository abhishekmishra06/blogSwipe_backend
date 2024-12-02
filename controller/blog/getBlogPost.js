const BlogPost = require("../../models/blogPostModel");
const { sendGeneralResponse } = require("../../utils/responseHelper");

const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });

    // Check if no blog posts exist
    if (!blogPosts.length) {
      return sendGeneralResponse(res, true, "No blog posts found", 200, []);
    }

    // Send response with the blog posts
    sendGeneralResponse(res, true, "Blog posts fetched successfully", 200, blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    sendGeneralResponse(res, false, "Internal server error", 500);
  }
};

module.exports = { getAllBlogs };
