import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AdminRegister({ setLoggedIn, setIsAdmin }) {
    const navigate = useNavigate();

    const [user,setUser] = useState({
        userName: '',
        userType: 'Admin',
        email: '',
        password: '',
        _confirmPassword: '',
        adminKey: '',
    });

    const [errors, setErrors] = useState({});

    const registerUser = (user, setErrors) => {
        axios
            .post('http://localhost:8000/admin/register', user, {
                withCredentials: true,
            })
            .then((response) => {
                setLoggedIn(true);
                setIsAdmin(true)
                console.log('Response', response.data );
                navigate('admin/users/' + response.data.user.userName );
            })
            .catch((error) => {
                console.log(error);
                setErrors(error.response.data.error.errors);
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser(user, setErrors);
    };

    const handleChange = (e) =>  {
        setUser({...user, [e.target.name]: e.target.value });
    }
    
    return (
    <div>
        <Form onSubmit={handleSubmit} className="postForm">
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter User Name"
                        name="userName"
                        onChange={ handleChange }/>
                    {errors.userName && <Form.Text className="text-danger">{errors.userName.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter E-mail Address"
                        name="email"
                        onChange={ handleChange }/>
                    {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>
            </Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={ handleChange }/>
                    {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="_confirmPassword"
                        onChange={ handleChange }/>
                    {errors._confirmPassword && <Form.Text className="text-danger">{errors._confirmPassword.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Admin Key:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="adminKey"
                        onChange={ handleChange }/>
                    {errors.adminKey && <Form.Text className="text-danger">{errors.adminKey.message}</Form.Text>}
                </Form.Group>
            <Button className="formButton" variant="primary" type="submit">Login</Button>
        </Form>
    </div>
    );
}

export default AdminRegister;