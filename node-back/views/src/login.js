import React, { useState, Component } from "react";
import './css/login.css';
import PropTypes from 'prop-types';
import axios from 'axios';

async function loginUser(creds) {
    return axios.post('http://localhost:3000/views/', {
        data: JSON.stringify(creds),
        headers: {
            'contentType': 'application/json'
        }
    })
    .then(data => data.json());
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return(
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Login</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>

                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>

                <div>
                    <button type="submit">Sign in</button>
                </div>
            </form>
        </div>        
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}