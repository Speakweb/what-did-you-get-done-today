const markdownIt = require('markdown-it');
const md = new markdownIt();

/**
 * GET /add
 * Add post page.
 */
exports.index = (req, res) => {
    if (req.user) {
        res.render('add', {
            title: 'Add Post'
        })
    } else {
        res.redirect('/signup')
    }
}

exports.mdPreview = (req, res) => {
    const previewContent = req.body.mdContent;
    const markdownPreview = md.render(previewContent) || previewContent;
    res.render('add', {
        title: 'Add',
        markdownPreview,
        previewContent
    })
}