import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', { loginData })
            .then((res) => {
                if (res.data.status == 401) {
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                } else if (res.data.status == 200) {
                    window.location.href = '/';
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='signup_card'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form_control'>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' id='email' placeholder='Enter Email' value={loginData.email}
                        onChange={e => setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }))} />
                </div>
                <div className='form_control'>
                    <label htmlFor='password'>Password :</label>
                    <input type='password' id='password' placeholder='Enter password' value={loginData.password}
                        onChange={e => setLoginData((prev) => ({ ...prev, [e.target.id]: e.target.value }))} />
                </div>
                <button className='signup_button'>Login</button>
            </form>
            <p>Not Registered ?</p>
            <Link to='/register' className='login_button'>Sign Up</Link>
        </div>
    )
}

export default Login