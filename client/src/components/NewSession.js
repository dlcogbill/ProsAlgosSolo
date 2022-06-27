import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SessionForm from './SessionForm';

function NewSession() {
    const navigate = useNavigate();
    const { userName } = useParams();
    const newPost = {
        sessionName: '',
        sessionType: '',
        status: 'Submitted',
        desc: '',
        date: '',
        location: '1234 Main street',
        locationName: '',
    }

    const addSessionDB = (session, setErrors) => {
        axios
            .post('http://localhost:8000/api/sessions', session, {withCredentials: true})
            .then((response) => {
                navigate('/users/' + userName);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error.response.data);
            })
    }

    return (
        <div>
            <h3>Book a Session:</h3>
            <SessionForm
                submitHandler={ addSessionDB }
                buttonText="Book Session"
                post={newPost} />
        </div>
    )
}

export default NewSession