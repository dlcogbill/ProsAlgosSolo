import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

function AdminHome({ isAdmin }) {
    const { username } = useParams();
    const [sessions,setSessions] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAdmin) {
            axios
                .get('http://localhost:8000/api/sessions/',{}, { withCredentials: true })
                .then((response) => {
                    setSessions(response.data);
                })
                .catch((error) => console.log('Get sessions error', error));
        } else {
            navigate('/reglog');
        }
    }, [])

    return (
    <div>
        <h3>
            <NavLink to={`/admin/${ username }`}>Home</NavLink>|
            <NavLink to={'/posts'}>View Posts</NavLink>|
            <NavLink to={'/admin/posts/new'}>Post some work!</NavLink>|
            <NavLink to={'/admin/users'}>Manage users!</NavLink>
        </h3>
        <div className="postList">
            {sessions.map((session) => (
                <div className="sessionListItem" key={session._id}>
                    <NavLink to={`/sessions/${ session._id }`} >{session.sessionName}</NavLink>
                    <p>Date: { new Date(session.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
                    <p>Type: {session.sessionType}</p>
                    <p>Status: {session.status}</p>
                </div>
            ))}
        </div>
    </div>
    );
}

export default AdminHome;