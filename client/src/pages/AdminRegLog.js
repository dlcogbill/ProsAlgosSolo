import AdminRegister from '../components/AdminRegister';
import AdminLogin from '../components/AdminLogin';
import { NavLink } from 'react-router-dom';

function AdminRegLog({ setLoggedIn, setIsAdmin }) {
    return (
        <div className="formContainer">
            <h3>
                <NavLink to={`/reglog`}>Basic User</NavLink>
            </h3>
            <div className="reglog">
                <AdminRegister setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>
                <AdminLogin setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>
            </div>
        </div>
    )
}

export default AdminRegLog