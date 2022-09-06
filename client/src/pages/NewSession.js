import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import SessionForm from '../components/SessionForm';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';

function NewSession({ loggedIn }) {
    const [user,setUser] = useState({});
    const [newSession,setNewSession] = useState(null);
    const navigate = useNavigate();
    const { userName } = useParams();

    useEffect(() => {
        if (loggedIn) {
            try {
                console.log(Cookies.get('userToken'));
                const userToken = Cookies.get('userToken');
                if (userToken) {
                    const payload = jwt(userToken);
                    console.log(payload);
                    setUser(payload);
    
                    const session = {
                        sessionName: '',
                        sessionType: '',
                        status: "Submitted",
                        desc: '',
                        date: '',
                        location: '',
                        locationName: '',
                        createdBy: ''
                    }
    
                    setNewSession(session);
                    
                } else {
                    throw "no token";
                }
            }
            catch (err) {
                console.log(err);
            }
        } else {
            navigate('/reglog');
        }
    }, []);

    

    const addSessionDB = (session, setErrors) => {
        console.log(session);
        axios
            .post('http://localhost:8000/api/sessions', session, {withCredentials: true})
            .then((response) => {
                navigate('/User/' + user.userName);
            })
            .catch((error) => {
                console.log(error);
                setErrors(error.response.data);
            })
    }

    return (
        <div>
            <h3>Book a Session:</h3>
            {newSession ? <SessionForm
                submitHandler={ addSessionDB }
                buttonText="Create Session"
                session={newSession}
                formStatus="Submitted" /> : <p>Loading</p> }
        </div>
    )
}

export default NewSession