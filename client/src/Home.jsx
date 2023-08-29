import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getposts');
            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:3001/deletepost/${postId}`);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Posts</h2>
            <div className="post-list">
                {posts.map(post => (
                    <div key={post._id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.description}</p>
                        {post.file && (
                            <div>
                                <img src={`http://localhost:3001/images/${post.file}`} alt={post.title} />
                            </div>
                        )}
                        <button
                            onClick={() => handleDelete(post._id)}
                            style={{ backgroundColor: 'red', color: 'white' }}
                        >
                            Delete
                        </button>
                        <button
                            style={{ backgroundColor: 'green', color: 'white' }}
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;





