import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin({ setLoggedIn, setIsAdmin }) {
    const [user,setUser] = useState({
        email: '',
        password: '',
        adminKey: '',
        userType: 'Admin',
    });
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const loginUser = (user, setErrors) => {
        axios
            .post('http://localhost:8000/admin/login', user, {
                withCredentials: true,
            })
            .then((response) => {
                setLoggedIn(true);
                setIsAdmin(true);
                navigate('/admin/' + response.data.user.userName );
            })
            .catch((error) => {
                console.log(error);
                setErrors(error.response.data.message);
            })
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(user, setErrors);
    };

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value });
    }
    return (
    <div>
        <Form onSubmit={handleSubmit} className="postForm">
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="E-mail Address"
                    name="email"
                    onChange={ handleChange }/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ handleChange }/>
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Admin Key:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Admin Key"
                    name="adminKey"
                    onChange={ handleChange }/>
            </Form.Group>
            {errors && <Alert variant='danger'>{errors}</Alert>}
            <Button className="formButton" variant="primary" type="submit">Login</Button>
        </Form>
    </div>
    );
}

export default AdminLogin;