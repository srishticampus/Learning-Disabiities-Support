const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT
const db = require("./dbConnection");
const router = require("./router");
const cors=require("cors")

// In your Express backend
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());
app.use("/", router);
app.use('/uploads', express.static('uploads'));

// In your Express backend


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

