import React, { useState } from "react";
import './css/login.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from "yup";

async function loginUser(creds) {
    return axios.post('http://localhost:8080/api/login', {
        data: {
            username: `${creds.username}`,
            password: `${creds.password}`
        }
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleLoginSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return(
        <div className="wrapper">
            <div className="logo-wrapper">
                <h1>Time To <span className="highlight-text">Move</span></h1>
            </div>

            <div className="login-wrapper">
                <div className="h2-wrapper">
                    <h2>Logowanie</h2>
                </div>
            
                <form onSubmit={handleLoginSubmit}>
                <div className="form-wrapper">
                    <div className="form-child">
                        <input name="username" type="text" required onChange={e => setUserName(e.target.value)} />
                        <label htmlFor="username">Login</label>
                    </div>

                    <div className="form-child">
                        <input name="username" type="password" required onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="username">Hasło</label>
                    </div>
 
                    <div className="form-child">
                        <button className="login-button" type="submit">Zaloguj się</button>
                    </div>
                    </div> 
                </form>
            </div>
            
            <div className="register-wrapper">
                <div className="h2-wrapper">
                    <h2>Rejestracja</h2>
                </div>
            
                <form onSubmit={handleRegisterSubmit}>
                    <div className="form-wrapper">
                        <div className="form-child">
                            <input name="username" type="text" required onChange={e => setUserName(e.target.value)} />
                            <label htmlFor="username">Imię</label>
                        </div>

                        <div className="form-child">
                            <input name="username" type="text" required onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="username">Nazwisko</label>
                        </div>

                        <div className="form-child">
                            <input name="username" type="text" required onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="username">E-mail</label>
                        </div>

                        <div className="form-child">
                            <input name="username" type="text" required onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="username">Login</label>
                        </div>

                        <div className="form-child">
                            <input name="username" type="password" required onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="username">Hasło</label>
                        </div>
    
                        <div className="form-child">
                            <button className="login-button" type="submit">Zarejestruj się</button>
                        </div>
                    </div> 
                </form>
            </div>
        </div>        
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}