const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed

const app = express();
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const path = require('path');
const cors = require('cors');
// const Image = require('../models/image'); 

const userRoutes = require('./routes/users');
const  authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products")

app.use(express.json());
app.use(cors());
app.use('/users', userRoutes);
app.use('/products', productsRoutes);
app.use("/api", authRoutes);
// app.post('/profile', upload.single('file'), function (req, res, next) {
//   res.send('Uploaded successfully')
// })
connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});