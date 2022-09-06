import React, { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserHome({ loggedIn }) {
    const { username } = useParams();
    const [sessions,setSessions] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (loggedIn) {
            axios
            .get(`http://localhost:8000/api/sessionsbyuser/${username}`, {}, { withCredentials: true })
            .then((response) => {
                setSessions(response.data);
            })
            .catch((error) => console.log('Get sessions error', error));
        } else {
            navigate('/reglog');
        }
    }, []);

    return (
    <div>
        <h3>
            <NavLink to='/sessions/new'>Book a session!</NavLink>
        </h3>
        <div className="postList">
            {sessions.map((session) => (
                <div className="sessionListItem" key={session._id}>
                    <NavLink to={`/sessions/${session._id}`}>{session.sessionName}</NavLink>
                    <p>Date: { new Date(session.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
                    <p>Type: {session.sessionType}</p>
                    <p>Status: {session.status}</p>
                </div>
            ))}
        </div>
    </div>
    );
}

export default UserHome;