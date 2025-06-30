const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed
const cors = require('cors');
const app = express();
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const path = require('path');
// const Image = require('../models/image'); 

const userRoutes = require('./routes/users');
const  authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products")
const materialsRoutes = require("./routes/materials")
const cartsRoutes = require("./routes/cart")
const cartRoutes = require('./routes/cart');
app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/materials', materialsRoutes);
app.use('/products', productsRoutes);
app.use('/carts', cartsRoutes);
app.use("/api", authRoutes);
app.use(cartRoutes); 
// app.post('/profile', upload.single('file'), function (req, res, next) {
//   res.send('Uploaded successfully')
// })
connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});