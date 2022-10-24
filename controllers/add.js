const Post = require('../models/Post');
const mongoose = require('mongoose');

/**
 * GET /add
 * Add post page.
 */
exports.index = (req, res) => {
    res.render('add', {
        title: 'Add'   
    });
};

/**
 * POST /add
 * Uploads a new post from the form
 */
exports.postAdd = (req, res) => {
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