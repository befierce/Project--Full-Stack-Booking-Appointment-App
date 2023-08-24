const path = require('path');
const http = require('http');
const express = require('express');

const app = express();

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
    // redirect
    console.log(res.url);
});
app.post('/',(req,res,next)=>{
    console.log(res.body);
});



app.listen(4000,()=>{
    console.log('server is running on port 4000');
});