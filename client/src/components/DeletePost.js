import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function DeletePost({ id }) {
    const navigate = useNavigate();
    const handleDelete = (event) => {
        event.preventDefault();
        axios
            .delete(`http://localhost:8000/api/posts/${id}`, {}, { withCredentials: true })
            .then((response) => {
                navigate(-1);
            })
            .catch((error) => console.log('Delete error', error));
    }
    return (
        <Button
            className="formButton"
            type="submit"
            onClick={handleDelete} >Delete</Button>
    )
}

export default DeletePost