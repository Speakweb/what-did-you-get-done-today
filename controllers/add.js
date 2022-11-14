const Post = require('../models/Post');

/**
 * GET /add
 * Add post page.
 */
exports.index = (req, res) => {
    res.render('add', {
        title: 'Add'   
    });
};