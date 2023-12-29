import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Register() {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const validation = () => {
        if (registerData.username == '') {
            toast.error('Username field is required', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else if (registerData.email == '') {
            toast.error('Email field is required', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else if (registerData.password == '') {
            toast.error('Password field is required', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else if (registerData.password.length <=7 ) {
            toast.error('Password field must be more than 8 characters', {
                position: toast.POSITION.TOP_RIGHT,
            })
            return false;
        } else {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()

        if (isValid) {
            axios.post('https://feelfreeblog-back.onrender.com/register', { registerData })
                .then((res) => {
                    if (res.data.status == 401) {
                        toast.error(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                    } else if (res.data.status == 200) {
                        toast.success(res.data.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        })
                        navigate('/login');
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='signup_card'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form_control'>
                    <label htmlFor='name'>Username :</label>
                    <input type='text' id='username' placeholder='Enter Username' value={registerData.username}
                        onChange={e => setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }))} />
                </div>
                <div className='form_control'>
                    <label htmlFor='email'>Email :</label>
                    <input type='email' id='email' placeholder='Enter Email' value={registerData.email}
                        onChange={e => setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }))} />
                </div>
                <div className='form_control'>
                    <label htmlFor='password'>Password :</label>
                    <input type='password' id='password' placeholder='Enter password' value={registerData.password}
                        onChange={e => setRegisterData((prev) => ({ ...prev, [e.target.id]: e.target.value }))} />
                </div>
                <button className='signup_button'>Sign Up</button>
            </form>
            <p>Already have account ?</p>
            <Link to='/login' className='login_button'>Login</Link>
        </div>
    )
}

export default Register