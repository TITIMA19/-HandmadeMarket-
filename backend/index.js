const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // for large base64 images

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const materialRoutes = require('./routes/materials');
const courseRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const statsRoutes = require('./routes/stats');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/stats', statsRoutes);
const statsController = require('./controllers/statsController');
app.use(statsController.recordVisitor);
const PAYPAL_CLIENT = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
app.post('/api/verify-paypal-payment', async (req, res) => {
    const { orderID } = req.body;

    try {
        const auth = Buffer.from(`${'AUaPgO0_-nWxLwxGsOJtc34SoUz7xbFVYO2DH-R7Yjt0AVGo8f9yE4l79ZMpNxT9V5i9OWBcXy5I7xZ-'}:${'AUaPgO0_-nWxLwxGsOJtc34SoUz7xbFVYO2DH-R7Yjt0AVGo8f9yE4l79ZMpNxT9V5i9OWBcXy5I7xZ-'}`).toString('base64');

        const response = await axios.get(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data.status === 'COMPLETED') {
            // Store in DB, mark order as paid
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Payment verification failed' });
    }
});
connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});