import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function PostForm(props) {
    const { submitHandler, buttonText, post} = props;

    const [link,setLink] = useState("");
    const [thumbnail,setThumbnail] = useState("");
    const [author,setAuthor] = useState("");

    useEffect(() => {
        if (post) {
            setLink(post.link);
            setThumbnail(post.thumbnail);
            setAuthor(post.author);
        }
    }, [post]);
    

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const formPost = {
            link: link,
            thumbnail: thumbnail,
            author: author,
        }
        submitHandler(formPost, setErrors);
    };
    
    return (
        <Form onSubmit={handleSubmit} className="postForm">
            <Form.Group className="mb-3">
                <Form.Label>Post Link:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Link to original post"
                    value={ link }
                    onChange={ (e) => setLink(e.target.value) }/>
                {errors.link && <Form.Text className="text-danger">{errors.link.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Thumbnail Address:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Thumbnail Address"
                    value={ thumbnail }
                    onChange={ (e) => setThumbnail(e.target.value) }/>
                {errors.thumbnail && <Form.Text className="text-danger">{errors.thumbnail.message}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Author of Post:</Form.Label>
                <Form.Select
                    type="text"
                    placeholder="Author of Post"
                    value={ author }
                    onChange={ (e) => setAuthor(e.target.value) }>
                    <option>Select an author</option>
                    <option value="Team Ideal Image">Team Ideal Image</option>
                    <option value="Kalief">Kalief</option>
                    <option value="Mal 📷🎥🎬🎤🎹">Mal 📷🎥🎬🎤🎹</option>
                </Form.Select>
                {errors.author && <Form.Text className="text-danger">{errors.author.message}</Form.Text>}
            </Form.Group>
            <Button className="formButton" variant="primary" type="submit">{buttonText}</Button>
        </Form>
    )
}

export default PostForm;