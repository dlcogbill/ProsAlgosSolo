import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SessionForm({ submitHandler, buttonText, session}) {
    const [formSession,setFormSession] = useState({});

    useEffect(() => {
        setFormSession(session);
        console.log(formSession);
        console.log(session);
    }, []);

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        submitHandler(formSession, setErrors);
    };
    const handleChange = (e) =>  {
        setFormSession({...session, [e.target.name]: e.target.value });
    }
    return (
        <Form onSubmit={handleSubmit} className="postForm">
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Session Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter a name for your session"
                    name="sessionName"
                    onChange={ handleChange }/>
                {errors.userName && <Form.Text className="text-danger">{errors.userName.message}</Form.Text>}
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Session Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        onChange={ handleChange } />
                    {errors.userName && <Form.Text className="text-danger">{errors.userName.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Session Type:</Form.Label>
                    <Form.Select
                        type="text"
                        name="sessionType"
                        onChange={ handleChange }>
                        <option>Select a type</option>
                        <option value="Photoshoot">Photoshoot</option>
                        <option value="Headshots">Headshots</option>
                        <option value="Event">Event</option>
                        <option value="Videography">Videography</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Other">Other</option>
                    {errors.userName && <Form.Text className="text-danger">{errors.userName.message}</Form.Text>}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="desc"
                    onChange={ handleChange }/>
                {errors.link && <Form.Text className="text-danger">{errors.link.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Location Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="locationName"
                    onChange={ handleChange }/>
                {errors.link && <Form.Text className="text-danger">{errors.link.message}</Form.Text>}
            </Form.Group>
            <Button className="formButton" variant="primary" type="submit">{buttonText}</Button>
        </Form>
    )
}

export default SessionForm