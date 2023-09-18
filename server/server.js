// defining the server port
const port = 5000

// initializing installed dependencies
const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv');
app.use(cors())

var googleSheetAPI = require('./googleSheetApi.js');

// listening for port 5000
app.listen(port, ()=> console.log(`Server is running on ${port}` ))

// API request
app.get('/', (req,res)=>{    
   
    googleSheetAPI.GetGoogleSheet(function (response) {
        console.log('SUCCESS -> ', response);
        res.json(response);
    }, function (error) {
        console.error(error);
    });
});