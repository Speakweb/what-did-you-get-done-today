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
 * GET /posts/${userId}
 * returns a page to which lists all of a user's posts
 */
 exports.getPosts = async (req, res) => {
    
};
  
/**
 * GET /posts/${userId}/${taskId}
 * returns a page which shows a single user's post
 */
exports.getPost = (req, res) => {
    res.render('post', {
        title: 'Find Post'
    });
}

/**
 * POST /posts
 * Uploads a new post from the form
 */
exports.postPosts = (req, res) => {
    const {content, userId, userName} = req.body;
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