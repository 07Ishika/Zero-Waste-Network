import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    servings: { type: Number, required: true },
    description: { type: String },
    location: { type: String },
    foodType: { type: String },
    expiresIn: { type: Date },
    phone: { type: String },
    email: { type: String },
    image: { type: String }, // stored filename
    status: { type: String, default: 'available', enum: ['available', 'picked', 'expired'] },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

export default mongoose.model('FoodListing', foodSchema)
