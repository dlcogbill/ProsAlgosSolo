const Post = require('../models/post.model');

module.exports = {
    //Controls for Posts
    getPosts: (req, res) => {
        Post.find()
        .then((allPosts) => {
            res.json(allPosts);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in findAll', error: err });
        });
    },
    
    createPost: (req, res) => {
        Post.create(req.body)
        .then((newPost) => {
            res.json(newPost);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in create', error: err });
        });
    },
    
    getPostById: (req, res) => {
        Post.findOne({ _id: req.params.id })
        .then((onePost) => {
            res.json(onePost);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in findById', error: err });
        });
    },
    
    deletePost: (req, res) => {
        Post.deleteOne({ _id: req.params.id })
        .then((post) => {
            res.json(post);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in delete', error: err });
        });
    },
    
    updatePost: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((updatedPost) => {
            res.json(updatedPost);
        })
        .catch((err) => {
            res.status(400).json({ message: 'Something went wrong in update', error: err });
        });
    },
}