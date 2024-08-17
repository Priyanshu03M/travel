import mongoose from "mongoose";
const GuideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative'],
    },
    maxGroupSize: {
        type: Number,
        required: true,
        min: [1, 'At least one person is required in the group'],
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Guide = mongoose.models.guides || mongoose.model('guides', GuideSchema);

export default Guide;