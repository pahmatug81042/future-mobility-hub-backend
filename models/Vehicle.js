import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['bus', 'scooter', 'bike', 'car'], default: 'car' },
    status: { type: String, enum: ['available', 'busy', 'offline'], default: 'available' },
    location: {
        lat: { type: Number },
        lng: { type: Number },
    },
}, { timestamps: true });

export default mongoose.model('Vehicle', vehicleSchema);
