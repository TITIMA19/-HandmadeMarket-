const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed
const app = express();
const userRoutes = require('./routes/users');
const  authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products")
app.use(express.json());
const cors = require('cors');
app.use(cors());
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use("/api", authRoutes);


// Connect to the database
connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});