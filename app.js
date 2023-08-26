const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const db = require('./util/database');//pool of querries

const app = express();

const adminRoutes  = require('./routes/admin');

//function to check if db is working or not


//middlewares
app.use(cors());
app.use(express.json()); // Middleware for JSON parsing
app.use(express.urlencoded({ extended: false })); // Middleware for form data parsing

app.use(adminRoutes);
//middlewares

app.listen(3000,()=>{
    console.log('server is running on port 4000');
});