import React, { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(res => {
                if (res.data === "Success") {
window.location.href = "/"

             
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Login</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="**********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="signup-button">Login</button>
                </form>
                <div className="login-section">
                    <p>Not Registered?</p>
                    <button>
                        <Link to="/register">Sign Up</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
