import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);

        axios.post('http://localhost:3001/create', formData)
            .then((res) => {
                if (res.data === 'Success') {
                    navigate('/');
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="register-container" style={{ alignItems: 'center' }}>
            <div className="register-form post_form">
                <h2>Create Post</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="desc">Description:</label>
                        <textarea
                            name="desc"
                            id="desc"
                            cols="30"
                            rows="10"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="input-group">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            name=""
                            id=""
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <button className="signup-button">Post</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;

















