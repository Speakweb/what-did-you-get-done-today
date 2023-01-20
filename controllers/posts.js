const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose');
const markdownIt = require('markdown-it');
const md = new markdownIt();

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
 * GET and POST /posts/:userId
 * returns a page to which lists all posts from a single user
 */
exports.getAllPostsFromUser = async (req, res) => {
    const url = req.baseUrl + req.path; // url without params
    const pageNum = req.query.page ? parseInt(req.query.page) - 1 : 0;
    const postIndex = 5 * pageNum;
    const allPostsFromUser = await Post.find({
        createdBy: mongoose.Types.ObjectId(req.params.userId)
    }).populate('createdBy', 'profile.name').skip(postIndex).limit(5);
    const numOfPosts = await Post.count({ createdBy: mongoose.Types.ObjectId(req.params.userId) });
    const lastPage = allPostsFromUser.length < 5 || (Math.floor(numOfPosts/(5*(pageNum+1))) === 1 && numOfPosts%5*(pageNum+1) === 0);
    const multiplePages = numOfPosts > 5;
    const queriedUserName = await User.findOne({_id: mongoose.Types.ObjectId(req.params.userId)}, 'profile.name').exec();
    res.render('all-posts', {
        title: 'All Posts',
        allPosts: allPostsFromUser,
        queryType: 'allPostsFromUser',
        queriedUserId: req.params.userId,
        queriedUserName: queriedUserName.profile.name,
        pageNum: pageNum + 1,
        url,
        multiplePages,
        lastPage
    });
};

/**
 * GET and POST /profile
 * returns a page which shows all the posts form the user that is currently logged in
 */

exports.getAllPostsFromCurrentUser = async (req, res) => {
    if (req.user) {
        const url = req.baseUrl + req.path; // url without params
        const pageNum = req.query.page ? parseInt(req.query.page) - 1 : 0;
        const postIndex = 5 * pageNum;
        const allPostsFromUser = await Post.find({
            createdBy: mongoose.Types.ObjectId(req.user._id)
        }).populate('createdBy', 'profile.name').skip(postIndex).limit(5);
        const numOfPosts = await Post.count({ createdBy: mongoose.Types.ObjectId(req.user._id) });
        const lastPage = allPostsFromUser.length < 5 || (Math.floor(numOfPosts/(5*(pageNum+1))) === 1 && numOfPosts%5*(pageNum+1) === 0);
        const multiplePages = numOfPosts > 5;
        const queriedUserName = await User.findOne({_id: req.user._id}, 'profile.name').exec()
        console.log(queriedUserName.profile)
        res.render('all-posts', {
            title: 'Profile',
            allPosts: allPostsFromUser,
            queryType: 'allPostsFromCurrentUser',
            queriedUserId: req.user._id,
            queriedUserName: queriedUserName.profile.name,
            pageNum: pageNum + 1,
            url,
            multiplePages,
            lastPage
        })
    } else {
        res.redirect("/")
    }
};

/**
 * GET and POST /posts/:userId/:taskId
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
        queriedUserName: queriedUserName.profile.name,
        multiplePages: false
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
        content: md.render(content),
    });
    post.save((err) => {
        if (err) {
            console.log("\n" + "post save error: " + err + "\n")
        }
    });
    res.redirect('/');
}