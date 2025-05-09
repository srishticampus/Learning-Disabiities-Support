const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT
const db = require("./dbConnection");
const router = require("./router");
const cors=require("cors")

app.use(cors());
app.use(express.json());
app.use("/disability_support_api", router);
app.use('/uploads', express.static('uploads'));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

