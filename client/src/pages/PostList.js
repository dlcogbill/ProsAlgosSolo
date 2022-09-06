import {useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import DeletePost from '../components/DeletePost';

function PostList({ isAdmin }) {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/posts')
            .then((response) =>{
                setPosts(response.data);
            })
            .catch((error) => {
                console.log('Error in get posts', error);
            })
    },[]);

    return (
    <div>
        <h3>Dedicated to excellence:</h3>
        <div className="postList">
            {posts.map((post) => (
            <div className="postListItem" key={post._id}>
                <a href={post.link}>
                    <img alt={post.link} src={post.thumbnail} />
                </a>
                <p>{post.author}</p>
                {isAdmin ? (
                    <div>
                        <NavLink to={`/posts/${post._id}/edit`}>Edit</NavLink>
                        <DeletePost id={post._id} />
                    </div>)
                : (<p></p>) }
                
            </div>
            ))}
        </div>
    </div>
    )
}

export default PostList;