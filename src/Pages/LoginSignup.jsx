import React, { useState } from 'react'
import './css/LoginSignup.css'
import axios from 'axios';

const LoginSignup = () => {

    const [state, setState] = useState('Login')
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        console.log('Login Func Executed', formData);
        try {
            const response = await axios.post('http://localhost:4000/api/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = response.data;

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert('Errors');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred');
        }
    };

    const signup = async () => {
        console.log('Sign Up Func Executed', formData);
        try {
            const response = await axios.post('http://localhost:4000/api/user/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const responseData = response.data;

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/login");
            } else {
                alert('Errors');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred');
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === 'Sign Up'
                        ? <input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='Your Name' />
                        : <></>
                    }
                    <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
                    <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
                </div>
                <button onClick={() => { state === 'Login' ? login() : signup() }} >Continue</button>
                {state === 'Sign Up'
                    ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState('Login') }} > Login here </span> </p>
                    : <p className="loginsignup-login">Create an account? <span onClick={() => { setState('Sign Up') }} > Click here </span> </p>
                }

                <div className="loginsignup-agree">
                    <input type="checkbox" required name='' id='' />
                    <p>By continuing, i agree to the terms of use & privacy policy </p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
