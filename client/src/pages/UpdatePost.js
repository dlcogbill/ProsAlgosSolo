import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';

function UpdatePost({ isAdmin }) {
    const navigate = useNavigate();
    const {id} = useParams();
    const [updatePost,setUpdatePost] = useState({});

    if(!isAdmin) {
        navigate('/posts');
    }
    
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/posts/'+ id)
            .then((response) => {
                setUpdatePost(response.data);
            })
            .catch((error) => {
                console.log('Error in get post', error);
            });
    },[]);

    const updatePostDB = (post, setErrors) => {
        axios
        .put(`http://localhost:8000/api/posts/${id}`, post)
            .then((response) => {
                navigate('/posts');
            })
            .catch((error) => {
                setErrors(error.response.data.error.errors);
            });
    };

    return (
        <div>
            <h3>Update</h3>
            <PostForm submitHandler={updatePostDB} buttonText="Update Post" post={updatePost} />
        </div>
    );
}

export default UpdatePost;