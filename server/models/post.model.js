const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        link: {
            type: String,
            required: [true, 'A link to the post is required!'],
            minlength: [3, 'Link must be at least 3 characters!'],
        },
        thumbnail: {
            type: String,
            required: [true, 'An address for the thumbnail is required!'],
            minlength: [3, 'Thumbnail address must be at least 3 characters!'],
        },
        author: {
            type: String,
            required: [true, 'An author is required!'],
            minlength: [3, 'Author must be at least 3 characters!'],
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;