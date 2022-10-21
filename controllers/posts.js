const Post = require('../models/Post');

/**
 * GET /posts/${userId}
 * returns a page to which lists all a users posts
 */
 exports.getAllPosts = (req, res) => {
    res.render('all-posts', {
        title: 'All Posts'   
    });
};
  
/**
 * GET /posts/${userId}/${taskId}
 * returns a page which shows a single user's post
 */
exports.getPost = (req, res) => {
    res.render('post', {
        title: 'Find Post'
    })
}