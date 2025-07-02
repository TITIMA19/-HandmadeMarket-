const express = require('express');
const connectDB = require('./config/db'); // Adjust the path as needed
const cors = require('cors');
const app = express();
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/users');
// const  authRoutes = require("./routes/auth");
// const productsRoutes = require("./routes/products")
// const materialsRoutes = require("./routes/materials")
// const cartRoutes = require('./routes/cart');
// app.use(express.json());
// app.use(bodyParser.json());
// app.use('/users', userRoutes);
// app.use('/materials', materialsRoutes);
// app.use('/products', productsRoutes);
// app.use("/api", authRoutes);
// app.use("/api/user",cartRoutes); 
// app.post('/profile', upload.single('file'), function (req, res, next) {
//   res.send('Uploaded successfully')
// })
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/materials", require("./routes/materials"));
connectDB();
app.listen(3000, () => {
    console.log('Example app listening on port 3000');
});