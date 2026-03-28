import mongoose from 'mongoose'

const volunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    area: { type: String },
    availability: { type: String },
    hasVehicle: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Volunteer', volunteerSchema)
