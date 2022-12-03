const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');

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
 * GET /posts
 * used to return all posts, now redirects to home ("/") whcih does the same thing
 */
exports.getAllPosts = (req, res) => {
    res.redirect("/")
};

/**
 * GET /posts/:userId
 * returns a page to which lists all posts from a single user
 */
exports.getAllPostsFromUser = async (req, res) => {
    const allPostsFromUser = await Post.find({
        createdBy: mongoose.Types.ObjectId(req.params.userId)
    }).populate('createdBy', 'profile.name');
    const queriedUserName = await User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, 'profile.name').exec();
    res.render('all-posts', {
        title: 'All Posts',
        allPosts: allPostsFromUser,
        queryType: 'allPostsFromUser',
        queriedUserId: req.params.userId,
        queriedUserName: queriedUserName.profile.name
    });
};

/**
 * GET /posts/:userId/:taskId
 * returns a page which shows a single post from a single user
 */
exports.getPostFromUser = async (req, res) => {
    const postFromUser = await Post.findOne({
        _id: mongoose.Types.ObjectId(req.params.taskId),
        createdBy: mongoose.Types.ObjectId(req.params.userId)
    }).populate('createdBy', 'profile.name').exec();
    const queriedUserName = await User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, 'profile.name').exec();
    res.render('all-posts', {
        title: 'All Posts',
        queriedPost: postFromUser,
        queryType: 'postFromUser',
        queriedTaskId: req.params.taskId,
        queriedUserId: req.params.userId,
        queriedUserName: queriedUserName.profile.name
    });
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
}