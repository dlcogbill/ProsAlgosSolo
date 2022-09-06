import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteUser from '../components/DeleteUser';

function UsersHome({ isAdmin }) {
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAdmin) {
            axios
            .get(`http://localhost:8000/admin/users`, {}, { withCredentials: true })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => console.log('Get users error', error));
        } else {
            navigate('/reglog');
        }
    }, []);

    return (
    <div>
      <h3>
            <NavLink to={'/posts'}>View Posts</NavLink>|
            <NavLink to={'/Admin/posts/new'}>Post some work!</NavLink>|
            <NavLink to={'/Admin/users'}>Manage Users</NavLink>
        </h3>
        <div className="postList">
          {users ? users.map((user) => (
            <div className="sessionListItem" key={user._id}>
              <p>Username: { user.userName }</p>
              <p>E-mail: { user.email }</p>
              <p>Type: { user.userType }</p>
              <p>Created: { new Date(user.createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
              <DeleteUser id={user._id}/>
            </div>
          )) : <p>Loading</p> }
        </div>
    </div>
    );
}

export default UsersHome;