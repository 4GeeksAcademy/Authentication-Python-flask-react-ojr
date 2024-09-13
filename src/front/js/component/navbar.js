import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        actions.logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto">
                    {store.token ? (
                        <button className="btn btn-primary" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary mx-2">Login</button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-secondary">Signup</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

