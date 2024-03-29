import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';
import { NavLink } from 'react-router-dom';

function RegLog({setLoggedIn}) {
    return (
        <div className="formContainer">
            <h3>
                <NavLink to={`/admin/reglog`}>Admin</NavLink>
            </h3>
            <div className="reglog">
                <Register setLoggedIn={setLoggedIn} />
                <Login setLoggedIn={setLoggedIn} />
            </div>
        </div>
    )
}

export default RegLog