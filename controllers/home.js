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
  const pageNum = req.query.page ? parseInt(req.query.page) - 1 : 0;
  const postIndex = 5 * pageNum;
  const queriedPosts = await Post.find({}).sort({createdAt: -1}).populate('createdBy', 'profile.name').skip(postIndex).limit(5);
  const allPosts = JSON.parse(JSON.stringify(queriedPosts));
  const numOfPosts = await Post.count({});
  const lastPage = allPosts.length < 5 || (Math.floor(numOfPosts/(5*(pageNum+1))) === 1 && numOfPosts%5*(pageNum+1) === 0); 
  const multiplePages = numOfPosts > 5;
  res.render('all-posts', {
    title: 'Home',
    allPosts,
    queryType: 'allPosts',
    pageNum: pageNum + 1,
    url: '/',
    multiplePages,
    lastPage
  });
}