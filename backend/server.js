import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import foodRoutes from './routes/food.js'
import volunteerRoutes from './routes/volunteer.js'
import statsRoutes from './routes/stats.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://zerowastenetwork.vercel.app'],
    credentials: true
}))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/food', foodRoutes)
app.use('/api/volunteer', volunteerRoutes)
app.use('/api/stats', statsRoutes)

// Health check
app.get('/', (req, res) => res.json({ message: 'WasteNot API running' }))

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected')
        app.listen(process.env.PORT || 5000, () =>
            console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
        )
    })
    .catch(err => console.error('❌ MongoDB connection error:', err))
