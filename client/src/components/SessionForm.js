import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SessionForm({ submitHandler, buttonText, session, formStatus }) {
    const [sessionName,setSessionName] = useState("");
    const [date,setDate] = useState("");
    const [sessionType,setSessionType] = useState("");
    const [desc,setDesc] = useState("");
    const [locationName,setLocationName] = useState("");
    const [location,setLocation] = useState("");
    const [status,setStatus] = useState("");
    const [createdBy,setCreatedBy] = useState("");
    let payload = {};
    let formSession = {};

    useEffect(() => {
        try {
            console.log(Cookies.get('userToken'));
            const userToken = Cookies.get('userToken');
            
            if (userToken) {
                payload = jwt(userToken);
                console.log(payload);
            } else {
                throw "no token";
            }
            if (session) {
                formSession = session;
                console.log(formSession);
            }
        }
        catch (err) {
            console.log(err);
        }
        console.log(session);
        console.log(formSession);
        setSessionName(session.sessionName);
        setDate(session.date);
        setSessionType(session.sessionType);
        setDesc(session.desc);
        setLocationName(session.locationName);
        setLocation(session.location);
        setStatus(formStatus);
        setCreatedBy(payload._id);
    }, [session]);

    const [errors, setErrors] = useState({});

    const formatDate = (date) => {
        let d = new Date(date);
        let month = (d.getMonth() + 1).toString().padStart(2, '0');
        let day = d.getDate().toString().padStart(2, '0');
        let year = d.getFullYear();
        return [year, month, day].join('-');
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        formSession = {
            sessionName: sessionName,
            date: date,
            desc: desc,
            locationName: locationName,
            location: location,
            sessionType: sessionType,
            status: formStatus,
            createdBy: createdBy,
        };
        submitHandler(formSession, setErrors);
    };

    return (
        <Form onSubmit={handleSubmit} className="postForm">
            <Form.Group as={Col} className="mb-3">
                <Form.Label>Session Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter a name for your session"
                    name="sessionName"
                    value={session.sessionName}
                    onChange={ (e) => setSessionName(e.target.value) }/>
                {errors.sessionName && <Form.Text className="text-danger">{errors.sessionName.message}</Form.Text>}
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Session Date:</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={ formatDate(session.date) }
                        onChange={ (e) => setDate(e.target.value) } />
                    {errors.date && <Form.Text className="text-danger">{errors.date.message}</Form.Text>}
                </Form.Group>
                <Form.Group as={Col} className="mb-3">
                    <Form.Label>Session Type:</Form.Label>
                    <Form.Select
                        type="text"
                        name="sessionType"
                        value={session.sessionType}
                        onChange={ (e) => setSessionType(e.target.value) }>
                        <option>Select a type</option>
                        <option value="Photoshoot">Photoshoot</option>
                        <option value="Headshots">Headshots</option>
                        <option value="Event">Event</option>
                        <option value="Videography">Videography</option>
                        <option value="Music Video">Music Video</option>
                        <option value="Other">Other</option>
                    {errors.sessionType && <Form.Text className="text-danger">{errors.sessionType.message}</Form.Text>}
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="desc"
                    value={session.desc}
                    onChange={ (e) => setDesc(e.target.value) }/>
                {errors.desc && <Form.Text className="text-danger">{errors.desc.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Location Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="locationName"
                    value={session.locationName}
                    onChange={ (e) => setLocationName(e.target.value) }/>
                {errors.locationName && <Form.Text className="text-danger">{errors.locationName.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Location Address:</Form.Label>
                <Form.Control
                    type="text"
                    name="location"
                    value={session.location}
                    onChange={ (e) => setLocation(e.target.value) }/>
                {errors.location && <Form.Text className="text-danger">{errors.location.message}</Form.Text>}
            </Form.Group>
            <Button className="formButton" variant="primary" type="submit">{buttonText}</Button>
        </Form>
    )
}

export default SessionForm