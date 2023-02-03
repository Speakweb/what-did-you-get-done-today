const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    likes: {}
}, { timestamps: true, strict: false });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
