const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    try {
        const uri = process.env.DB_URI; // Get the URI from environment variables
        console.log('MongoDB URI:', uri); // Log the URI for debugging
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error with connecting with the DB', error);
    }
};

module.exports = connectDB;