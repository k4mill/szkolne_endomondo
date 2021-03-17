import React, { useState, useEffect } from "react";
import './css/login.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';

export default function Login({ setToken }) {
    async function loginUser(creds) {
        return axios.post('http://20.52.157.254:8080/api/login', {
            data: {
                username: `${creds.loginUsername}`,
                password: `${creds.loginPassword}`
            }
        })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    async function registerUser(details) {
        return axios.post('http://20.52.157.254:8080/api/createUser', {
            data: {
                username: `${details.registerUsername}`,
                password: `${details.registerPassword}`,
                imie: `${details.firstName}`,
                nazwisko: `${details.lastName}`,
                klasa_id: `${details.email}`
            }
        })
        .then(() => {
           console.log("Successfully created a user")
           clearState();
        })
        .catch(err => {
            console.log(err);
        })
    }

    function clearState() {
        setFirstName('');
        setLastName('');
        setEmail('');
        setRegisterUserName('');
        setRegisterPassword('');
    }

    const [loginUsername, setLoginUserName] = useState();
    const [loginPassword, setLoginPassword] = useState();

    const handleLoginSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            loginUsername,
            loginPassword
        });

        if(token.token) {
            setToken(token);
            window.location.reload(); // JANUSZOWY WORKAROUND
        }

        else {
            updateIsActive(!isActive);
        }
    }

    useEffect(() => {
        if(isActive) {
            setTimeout(() => {
                updateIsActive(!isActive);
            }, 4000)
        }
        
    })

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [registerUsername, setRegisterUserName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [message, updateMessage] = useState('');
    const [isActive, updateIsActive] = useState(false);

    const handleRegisterSubmit = async e => {
        e.preventDefault();
        e.target.reset();
        await registerUser({
            firstName,
            lastName,
            email,
            registerUsername,
            registerPassword
        });
        updateMessage(`Dziękujemy za rejestrację ${firstName}`)
    }

    return(
        <div className="wrapper">
            <div className="mobile">
                <h2 style={{textAlign: 'center', fontSize: '300%'}}>Aplikacja mobilna nie jest jeszcze gotowa.</h2>
            </div>
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
                        <input name="username" type="text" required onChange={e => setLoginUserName(e.target.value)} />
                        <label htmlFor="username">Login</label>
                    </div>

                    <div className="form-child">
                        <input name="username" type="password" required onChange={e => setLoginPassword(e.target.value)} />
                        <label htmlFor="username">Hasło</label>
                    </div>
 
                    <div className="form-child">
                        <button className="login-button" type="submit">Zaloguj się</button>
                    </div>
                    <p className={isActive ? 'fail-active' : 'fail-text'}>
                        Nieprawidłowy login lub hasło
                    </p>
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
                            <input name="name" type="text" required onChange={e => setFirstName(e.target.value)} />
                            <label htmlFor="name">Imię</label>
                        </div>

                        <div className="form-child">
                            <input name="surname" type="text" required onChange={e => setLastName(e.target.value)} />
                            <label htmlFor="surname">Nazwisko</label>
                        </div>

                        <div className="form-child">
                            <input name="klasa" type="text" required onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="klasa">ID klasy</label>
                        </div>

                        <div className="form-child">
                            <input name="login" type="text" required onChange={e => setRegisterUserName(e.target.value)} />
                            <label htmlFor="login">Login</label>
                        </div>

                        <div className="form-child">
                            <input name="pwd" type="password" required onChange={e => setRegisterPassword(e.target.value)} />
                            <label htmlFor="pwd">Hasło</label>
                        </div>
    
                        <div className="form-child">
                            <button className="login-button" type="submit">Zarejestruj się</button>
                        </div>

                        <p className="success-text">{message}</p>
                    </div> 
                </form>
            </div>
        </div>        
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}