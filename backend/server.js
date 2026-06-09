import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import packageRoutes from './routes/packageRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Replaces raw networking setups with standardized cross-origin allowances
app.use(cors());
app.use(express.json());

// Main Domain Route Mount Points (Replacing individual class listeners)
app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/package', packageRoutes);

// Base application health monitoring endpoint
app.get('/', (req, res) => {
    res.send('Travel Management System Server API is running smoothly.');
});

// Start listening for inbound connection requests on Port 5000
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});