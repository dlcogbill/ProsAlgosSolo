import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';
import SessionItem from '../components/SessionItem';

function ViewSession({ loggedIn }) {
    const { id } = useParams();
    const [session,setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            axios
                .get(`http://localhost:8000/api/sessions/${id}`, {}, { withCredentials: true })
                .then((response) =>{
                    console.log(response.data);
                    setSession(response.data);
                })
                .catch((error) => {
                    console.log('Error in get session', error);
                })
        } else {
            navigate('/reglog');
        }
    },[]);
    return (
        <div>
            {session ? <SessionItem session={session} /> : <p>Loading</p> }
        </div>
    )
}

export default ViewSession;