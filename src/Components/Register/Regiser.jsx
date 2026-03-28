import { useState } from "react";
import "../Login/Login.css";
import { Link, useNavigate } from 'react-router-dom'
import video from '../Login assets/video.mp4'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { MdMarkEmailRead } from 'react-icons/md'
import API from '../../api'

const Register = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await API.post('/auth/register', form)
            setMessage('✅ Registered successfully! Redirecting to login...')
            setTimeout(() => navigate('/login'), 1000)
        } catch (err) {
            setMessage('❌ ' + (err.response?.data?.error || 'Registration failed'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='registerPage flex'>
            <div className='container flex'>

                <div className='videoDiv'>
                    <video src={video} autoPlay muted loop ></video>
                    <div className='textDiv'>
                        <h2 className='title'>Create and sell Extraordinary Products</h2>
                        <p>Adopt peace of Nature</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className='text'>Have an account?</span>
                        <Link to={'/login'}>
                            <button className='btn'>Login</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <h3>Let Us Know You!</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="form grid">
                        {message && <span className="showMessage">{message}</span>}
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className='icon' />
                                <input type="email" id="email" placeholder="Enter Email"
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input type="text" id="username" placeholder="Enter Username"
                                    value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input type="password" id="password" placeholder="Enter Password"
                                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                            </div>
                        </div>
                        <button type='submit' className="btn flex" disabled={loading}>
                            <span>{loading ? 'Registering...' : 'Register'}</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register
