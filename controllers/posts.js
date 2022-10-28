const Post = require('../models/Post');
const mongoose = require('mongoose');

/**
 * GET /posts/
 * returns a page to which lists all users' posts
 */
exports.getAllPosts = async (req, res) => {
    const allPosts = await Post.find({}).populate('createdBy', 'profile.name');
    res.render('all-posts', {
        title: 'All Posts',
        allPosts
    });
};

/**
 * GET /posts/search
 * returns a page to which allows user to search for posts
 */
exports.getPostsSearch = async (req, res) => {
    res.render('search-posts', {
        title: 'Search Posts'
    });
};

/**
 * GET /posts/:userId
 * returns a page to which lists all posts from a single user
 */
exports.getPostsFromUser = async (req, res) => {

};
  
/**
 * GET /posts/:userId/:taskId
 * returns a page which shows a single post from a single user
 */
exports.getPostFromUser = (req, res) => {
}

/**
 * POST /posts
 * Uploads a new post from the form
 */
exports.postPosts = (req, res) => {
    const {content, userId} = req.body;
    const post = new Post({
        createdBy: mongoose.Types.ObjectId(userId),
        content
    });
    post.save((err) => {
        if (err) {
            // todo: handle error
        }
        res.render('uploaded', {
            title: 'Uploaded'
        });
    });
    //console.log(req.body);
}

/**
 * function search(form) {
        const userId = document.getElementsByName("userId")[0].value;
        const postId = document.getElementsByName("postId")[0].value;
        form.action = `posts/${userId}${postId && "/" + postId}`;
        return true;
      }

          function search(form) { const userId = document.getElementsByName("userId")[0].value; const postId = document.getElementsByName("postId")[0].value; form.action = `${hostBaseUrl}/posts/${userId}${postId && "/" + postId}`; };
 */