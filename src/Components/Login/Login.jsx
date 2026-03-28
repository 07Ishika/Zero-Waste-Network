import { useState } from "react";
import '../Login/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import video from '../Login assets/video.mp4'
import logo from '../Login assets/image.png'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import API from '../../api'

const Login = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', password: '' })
    const [message, setMessage] = useState('Login Status will go here')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await API.post('/auth/login', form)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('username', res.data.username)
            setMessage('✅ Login successful!')
            setTimeout(() => navigate('/Dashboard'), 800)
        } catch (err) {
            setMessage('❌ ' + (err.response?.data?.error || 'Login failed'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='loginPage flex'>
            <div className='container flex'>

                <div className='videoDiv'>
                    <video src={video} autoPlay muted loop ></video>
                    <div className='textDiv'>
                        <h2 className='title'>Create and sell Extraordinary Products</h2>
                        <p>Adopt peace of Nature</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className='text'>Don't have an account?</span>
                        <Link to={'/Register'}>
                            <button className='btn'>Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" style={{ width: "140px", height: "60px", display: "block", margin: "0 auto" }} />
                        <h3 style={{ marginBottom: "0px" }}>Welcome Back</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="form grid" style={{ marginTop: "0px" }}>
                        <span className="showMessage">{message}</span>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id="username" placeholder="Enter Username" autoComplete="username"
                                    value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id="password" placeholder="Enter Password" autoComplete="current-password"
                                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                            </div>
                        </div>

                        <button type='submit' className="btn flex" disabled={loading}>
                            <span>{loading ? 'Logging in...' : 'Login'}</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                        <span className="forgotPassword">
                            Forgot your password? <a href="">Click Here</a>
                        </span>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login;
