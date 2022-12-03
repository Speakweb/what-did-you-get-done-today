const Post = require("../models/Post");
/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  const allPosts = await Post.find({}).populate('createdBy', 'profile.name');
  res.render('all-posts', {
    title: 'Home',
    allPosts,
    queryType: 'allPosts'
  });
}
