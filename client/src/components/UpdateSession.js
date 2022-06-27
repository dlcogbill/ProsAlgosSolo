import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SessionForm from './SessionForm';

function UpdateSession() {
    const { userName, id } = useParams();
    const [ updateSession, setUpdateSession ] = useState({});
    const [ editSession, setEditSession ] = useState({});
    const navigate = useNavigate();
    

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/sessions/'+ id)
            .then((response) => {
                setUpdateSession(response.data);
                setEditSession(response.data);
            })
            .catch((error) => {
                console.log('Error in get session', error);
            });
            console.log(updateSession);
            console.log(editSession);
    },[]);

    const updateSessionDB = (session, setErrors) => {
        axios
            .put(`http://localhost:8000/api/sessions/${id}`, session)
            .then((response) => {
                navigate('/users/' + userName);
            })
            .catch((error) => {
                setErrors(error.response.data.error.errors);
            });
    };

    return (
        <div>
            <h3>Update your Session:</h3>
            <SessionForm
                submitHandler={ updateSessionDB }
                buttonText="Update Session"
                post={updateSession} />
        </div>
    )
}

export default UpdateSession