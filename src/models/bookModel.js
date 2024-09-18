import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guides',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    date: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: [1, 'At least one guest is required']
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'Total price cannot be negative']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.models.bookings || mongoose.model('bookings', bookSchema);

export default Book;