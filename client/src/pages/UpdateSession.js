import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SessionForm from '../components/SessionForm';

function UpdateSession() {
    const { userName, id } = useParams();
    const [ editSession, setEditSession ] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/sessions/'+ id, {withCredentials: true})
            .then((response) => {
                console.log(response.data);
                setEditSession(response.data);
            })
            .catch((error) => {
                console.log('Error in get session', error);
            });
        
    },[]);

    const updateSessionDB = (session, setErrors) => {
        axios
            .put(`http://localhost:8000/api/sessions/${id}`, session, {withCredentials: true})
            .then((response) => {
                navigate('/Users/' + userName);
            })
            .catch((error) => {
                setErrors(error.response.data.error.errors);
            });
    };

    return (
        <div>
            <h3>Update your Session:</h3>
            {editSession ? <SessionForm
                submitHandler={ updateSessionDB }
                buttonText="Update Session"
                session={editSession} /> : <p>Loading</p> }
        </div>
    )
}

export default UpdateSession