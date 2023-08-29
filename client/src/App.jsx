import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Register from './Register';
import Login from './Login'; 
import Home from './Home';
import CreatePost from './CreatePost';
import { createContext } from 'react';
import axios from 'axios';

export const userContext = createContext();

function App() {
    axios.defaults.withCredentials = true;
    
    const [user, setUser] = useState({}); 

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(user => {
                setUser(user.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <userContext.Provider value={user}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                <Route path="/" element={<Home />} /> 
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<CreatePost />} />
                     
                </Routes>
            </BrowserRouter>
        </userContext.Provider>
    );
}

export default App;
