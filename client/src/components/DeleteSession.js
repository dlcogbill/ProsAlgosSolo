import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function DeleteSession({ id, username }) {
    const navigate = useNavigate();
    const handleDelete = (event) => {
        event.preventDefault();
        axios
            .delete(`http://localhost:8000/api/sessions/${id}`)
            .then((response) => {
                navigate(`/users/${username}`);
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

export default DeleteSession