const markdownIt = require('markdown-it');
const md = new markdownIt();

/**
 * GET /add
 * Add post page.
 */
exports.index = (req, res) => {
    if (req.user) {
        res.render('add', {
            title: 'Add',
            testFunction: function () {
                return 'testing'
            }
        })
    } else {
        res.redirect('/signup')
    }
}

exports.mdPreview = (req, res) => {
    console.log(req.body);
    const markdownPreview = req.body.mdContent ? md.render(req.body.mdContent) : '';
    res.render('add', {
        title: 'Add',
        markdownPreview
    })
}