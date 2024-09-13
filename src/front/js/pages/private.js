import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
        } else {
            fetch(`${process.env.BACKEND_URL}/api/private`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${store.token}`
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        actions.logout();
                        navigate('/login');
                    }
                })
                .then((data) => setUserData(data))
                .catch((error) => console.error('Error:', error));
        }
    }, [store.token]);

    return (
        <div className="container">
            <h1>Private Dashboard</h1>
            {userData ? (
                <p>Welcome, {userData.email}!</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
