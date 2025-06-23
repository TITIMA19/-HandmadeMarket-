const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed
const app = express();
const userRoutes = require('./routes/users');
app.use(express.json());
app.use('/users', userRoutes);


// Connect to the database
connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});