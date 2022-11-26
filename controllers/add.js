const Post = require('../models/Post');

/**
 * GET /add
 * Add post page.
 */
exports.index = (req, res) => {
    if (req.user) {
        res.render('add', {
            title: 'Add'
        })
    } else {
        res.redirect('/signup')
    }
}