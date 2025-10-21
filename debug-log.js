const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'debug-app.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  
  // Escrever no arquivo
  fs.appendFileSync(logFile, logMessage);
  
  // Também mostrar no console
  console.log(logMessage);
}

module.exports = { log };
