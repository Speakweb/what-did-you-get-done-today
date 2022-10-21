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

/**
 * POST /add
 * Uploads a new post from the form
 */
exports.postAdd = (req, res) => {
    // todo: save the data to the DB using the Schema
    /*
    const post = new Post({
        
    });
    */

    res.render('uploaded', {
        title: 'Uploaded'
    });
}