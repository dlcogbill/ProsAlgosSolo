import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

function NewPost({ isAdmin }) {
    const navigate = useNavigate();
    if(!isAdmin) {
        navigate('/posts');
    }
    const newPost = {
        link: '',
        thumbnail: '',
        author: '',
    }
    const addPostDB = (post, setErrors) => {
        axios
            .post('http://localhost:8000/api/posts', post)
            .then((response) => {
                navigate('/posts');
            })
            .catch((error) => {
                setErrors(error.response.data.error.errors);
            })
    }
    return (
        <div>
            <h3>Post an example of your work:</h3>
            <PostForm submitHandler={addPostDB} buttonText="Add Post" post={newPost} />
        </div>
    );
}

export default NewPost;