import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        fetch(`${process.env.BACKEND_URL}/api/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then((response) => {
                if (response.status === 201) {
                    navigate('/login');
                } else {
                    alert('Signup failed');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Signup
                </button>
            </form>
        </div>
    );
};
