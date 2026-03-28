import express from 'express'
import FoodListing from '../models/FoodListing.js'
import Volunteer from '../models/Volunteer.js'
import User from '../models/User.js'

const router = express.Router()

// GET /api/stats — real-time counts from DB
router.get('/', async (req, res) => {
    try {
        const totalFood = await FoodListing.countDocuments()
        const totalVolunteers = await Volunteer.countDocuments()
        const totalUsers = await User.countDocuments()
        const totalServings = await FoodListing.aggregate([
            { $group: { _id: null, total: { $sum: '$servings' } } }
        ])

        // food type breakdown for pie chart
        const foodByType = await FoodListing.aggregate([
            { $group: { _id: '$foodType', count: { $sum: 1 } } },
            { $project: { name: '$_id', value: '$count', _id: 0 } }
        ])

        // listings per day for last 7 days (bar chart)
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const dailyListings = await FoodListing.aggregate([
            { $match: { createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%m/%d', date: '$createdAt' } },
                    listings: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            { $project: { day: '$_id', listings: 1, _id: 0 } }
        ])

        res.json({
            totalFood,
            totalVolunteers,
            totalUsers,
            totalServings: totalServings[0]?.total || 0,
            foodByType,
            dailyListings,
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
