const fs = require('fs');
const path = require('path');
const login = require('fca-unofficial'); 
const express = require('express');
const dotenv = require('dotenv'); 
const config = require('./config'); 

dotenv.config(); 

// ... (rest of your code) 


login({ email: config.fbEmail, password: config.fbPassword }, (err, api) => {
   
});


const PAGE_ACCESS_TOKEN = config.pageAccessToken; 

