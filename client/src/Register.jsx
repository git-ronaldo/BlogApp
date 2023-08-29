import React, { useState } from 'react';
import './styles.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post('http://localhost:3001/register', { username, email, password })
            .then(res => navigate('/login'))
            .catch(err => console.log(err));
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Sign Up</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">UserName:</label>
                        <input type="text" placeholder="Enter Username"
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <br />
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" placeholder="Enter Email"
                            onChange={e => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" placeholder="**********"
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="signup-button">Sign Up</button>
                </form>
                <br />
                <p>Already have an account?</p>
                <button><Link to='/login'>Login</Link></button>
            </div>
        </div>
    );
}

export default Register;




// import React, { useState } from 'react';
// import './styles.css';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Register() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault(); 
//         axios.post('http://localhost:3001/register', { username, email, password }) // Fix the URL
//             .then(res => navigate('/login'))
//             .catch(err => console.log(err));
//     };

//     return (
//         <div className="register-container">
//             <div className="register-form">
//                 <h2>Sign Up</h2>
//                 <br />
//                 <form onSubmit={handleSubmit}>
//                     {/* Rest of your form */}
//                 </form>
//                 <br />
//                 <p>Already have an account?</p>
//                 <button><Link to='/login'>Login</Link></button>
//             </div>
//         </div>
//     );
// }

// export default Register;

