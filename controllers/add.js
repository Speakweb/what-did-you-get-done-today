//const markdownIt = require('markdown-it');
//const md = new markdownIt();

/**
 * GET /add
 * Add post page.
 */
exports.index = (req, res) => {
    if (req.user) {
        res.render('add', {
            title: 'Add',
            require,
            testFunction: function () {
                return 'testing'
            }
        })
    } else {
        res.redirect('/signup')
    }
}