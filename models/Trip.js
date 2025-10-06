import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    mode: { type: String, default: 'multi' },
    scheduledTime: { type: Date, required: true },
    notes: { type: String },
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
