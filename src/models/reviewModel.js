import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guides',
        required: true,
    },
    author: String,
    text: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Review =  mongoose.models.Reviews || mongoose.model('Reviews', reviewSchema);

export default Review; 
