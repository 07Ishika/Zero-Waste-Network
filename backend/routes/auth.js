import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password)
        return res.status(400).json({ error: 'All fields are required' })

    try {
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ username, email, password: hashed })
        res.status(201).json({ message: 'User registered successfully', userId: user._id })
    } catch (err) {
        if (err.code === 11000)
            return res.status(400).json({ error: 'Username or email already exists' })
        res.status(500).json({ error: err.message })
    }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ error: 'User not found' })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ error: 'Invalid password' })

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token, username: user.username, userId: user._id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
