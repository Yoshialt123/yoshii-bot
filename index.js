const fs = require('fs');
const path = require('path');
const login = require('fca-unofficial'); 
const express = require('express');
const dotenv = require('dotenv'); 

dotenv.config(); 

// Function to load appstate or config
function loadConfiguration() {
  const appstatePath = path.resolve('./appstate.json');
  const configPath = path.resolve('./config.json');

  try {
    const appstateData = fs.readFileSync(appstatePath, 'utf-8');
    return JSON.parse(appstateData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('appstate.json not found, loading config.json');
      return require(configPath); // Return config directly
    } else {
      console.error('Error loading appstate.json:', error);
      throw error; // Re-throw for serious errors
    }
  }
}


const appConfig = loadConfiguration();



login({ email: appConfig.fbEmail, password: appConfig.fbPassword }, (err, api) => {
if (err) return console.error(err);

  
});


const PAGE_ACCESS_TOKEN = appConfig.pageAccessToken; 

