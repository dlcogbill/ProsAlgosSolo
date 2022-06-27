import ProfileLink from './ProfileLink';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function Header({ loggedIn, setLoggedIn, setIsAdmin }) {
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (userToken) {
            const user = jwt(userToken);
            setUser(user);
        }
    }, [loggedIn]);
    const handleLogout = () => {
        axios
            .post('http://localhost:8000/logout', {}, { withCredentials: true})
            .then((response) => {
                Cookies.remove('userToken');
                setUser(null);
                setLoggedIn(false);
                setIsAdmin(false);
                navigate('/posts');
            })
            .catch((error) => {
                console.log('Logout error', error);
            })
    };

    return (
    <div className="header">
        <div className="profileLinkContainer">
            <ProfileLink
                link="https://www.instagram.com/teamidealimage/"
                thumbnail="./profileIdeal.png"
                alias="Team Ideal Image" />
            <ProfileLink
                link="https://www.instagram.com/kamakazefilmz/"
                thumbnail="./profileKal.png"
                alias="Kalief" />
            <ProfileLink
                link="https://www.instagram.com/myteamdope_real_ig/"
                thumbnail="./profileMal.png"
                alias="Mal 📷🎥🎬🎤🎹" />
        </div>
        {user ? (
                <div className="userBox">
                    <p>Welcome Back <NavLink to={`/${user.userType}/${user.userName}`}>{user.userName}</NavLink></p>
                    <Button className="formButton" onClick={handleLogout} >Logout</Button>
                </div>
            ) : (
                <div className="userBox">
                    <NavLink to="/Posts">Home</NavLink>
                    <NavLink to="/reglog">Register/Login</NavLink>
                </div>
            )}
    </div>
    );
}

export default Header;