import React, { useContext } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../App'
import axios from 'axios';
import logo from '../../assets/react.svg'

function Navbar() {
    const user = useContext(userContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        axios.get('https://feelfreeblog-back.onrender.com/logout').then(
            (res) => {
                if (res.data.status == 200) {
                    navigate(0);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }

    return (
        <div className='navbar-header'>
            <div>
                <h3><Link to="/" className='link logo'><img src={logo} alt='logo' style={{width:'27px'}} /> Blog App</Link></h3>
            </div>
            <div>
                <Link to="/" className='link'>Home</Link>
                {user.username ? <Link to="/create" className='link'>Create</Link> : null}
                <Link to="/about" className='link'>About</Link>
            </div>
            {
                user.username ?
                    <div>
                        <input type='button' className='btn_logout' value='Logout' onClick={handleLogout} />
                    </div>
                    :
                    <div>
                        <h5><Link className='link' to='/register'>Register/Login</Link></h5>
                    </div>
            }

        </div>
    )
}

export default Navbar