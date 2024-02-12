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
      return require(configPath); 
    } else {
      console.error('Error loading appstate.json:', error);
      throw error; 
    }
  }
}

const appConfig = loadConfiguration();

// ... (Rest of your Express server setup, if applicable)

login({ email: appConfig.fbEmail, password: appConfig.fbPassword }, (err, api) => {
  if (err) return console.error(err);

  api.setOptions({ listenEvents: true });

  const stopListening = api.listen((err, event) => {
    if (err) return console.error(err);

    switch (event.type) {
      case "message": 
        if (!event.body.startsWith(appConfig.commandPrefix)) return; 

        const commandName = event.body.slice(appConfig.commandPrefix.length).split(' ')[0];
        const args = event.body.slice(appConfig.commandPrefix.length + commandName.length + 1);

        handleCommand(api, commandName, args, event); 
        break;
      // ...case statements for other event types...
      default:
          console.log(event); // Log unknown events if needed
    }
  });
});
