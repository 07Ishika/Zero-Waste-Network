import express from 'express'
import multer from 'multer'
import path from 'path'
import FoodListing from '../models/FoodListing.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// Multer config for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
})
const upload = multer({ storage })

// GET /api/food — all available listings
router.get('/', async (req, res) => {
    try {
        const foods = await FoodListing.find({ status: 'available' }).sort({ createdAt: -1 })
        res.json(foods)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST /api/food — create a new listing (protected)
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        const data = {
            ...req.body,
            image: req.file ? req.file.filename : null,
            postedBy: req.user.id,
        }
        const food = await FoodListing.create(data)
        res.status(201).json(food)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// PATCH /api/food/:id/status — update status
router.patch('/:id/status', protect, async (req, res) => {
    try {
        const food = await FoodListing.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )
        res.json(food)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

export default router
