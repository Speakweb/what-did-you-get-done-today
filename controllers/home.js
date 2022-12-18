const Post = require("../models/Post");
/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  /**
   * todo: find better way to get posts without using MongoDB's cursor.skip function since it may 
   * have performance issues when the number of posts increase
   */
  const pageNum = req.query.page || 0;
  const postIndex = 5 * parseInt(pageNum);
  const allPosts = await Post.find({}).populate('createdBy', 'profile.name').skip(postIndex).limit(5);
  res.render('all-posts', {
    title: 'Home',
    allPosts,
    queryType: 'allPosts',
    pageNum
  });
}