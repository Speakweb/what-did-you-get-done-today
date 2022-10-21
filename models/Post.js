const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
