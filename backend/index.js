const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed

const app = express();

// Connect to the database
connectDB();

app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});