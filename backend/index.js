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

connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});