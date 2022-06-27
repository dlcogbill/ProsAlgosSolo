import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, NavLink} from 'react-router-dom';
import DeleteSession from './DeleteSession';

function ViewSession() {
    const { username, id  } = useParams();
    const [session,setSession] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/sessions/${id}`, {}, { withCredentials: true })
            .then((response) =>{
                console.log(response.data);
                setSession(response.data);
            })
            .catch((error) => {
                console.log('Error in get session', error);
            })
    },[]);
    return (
        <div className="sessionListItem">
            <p>{session.sessionName}</p>
            <p>Date: { new Date(session.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</p>
            <p>Type: {session.sessionType}</p>
            <p>Status: {session.status}</p>
            <p>Description: {session.desc}</p>
            <p>Location Name: {session.locationName}</p>
            <div>
                <NavLink to={`/${username}/sessions/${session._id}/edit`}>Edit</NavLink>
                <DeleteSession id={session._id} username={username}/>
            </div>
        </div>
    )
}

export default ViewSession