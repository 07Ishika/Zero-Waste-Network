import express from 'express'
import Volunteer from '../models/Volunteer.js'

const router = express.Router()

// POST /api/volunteer — register as volunteer
router.post('/', async (req, res) => {
    try {
        const volunteer = await Volunteer.create(req.body)
        res.status(201).json({ message: 'Volunteer registered!', volunteer })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// GET /api/volunteer — get all volunteers
router.get('/', async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 })
        res.json(volunteers)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
