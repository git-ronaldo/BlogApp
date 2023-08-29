import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './styles.css';
import { userContext } from './App';

function Navbar() {
    const user = useContext(userContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(res => {
                
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='navbar-header'>
            <div><h3>Blog App</h3></div>
            <div>
                <Link to='/' className="link">Home</Link>
                {}
                <Link to="/create" className="link">Create</Link>
                <a href="" className="link">Contact</a>
            </div>
            {user.username ? (
                <div>
                    <input type="button" onClick={handleLogout} value="Logout" className="btm_input" />
                </div>
            ) : (
                <h5><Link to="/login" className="link">Register/Login</Link></h5>
            )}
        </div>
    );
}

export default Navbar;


