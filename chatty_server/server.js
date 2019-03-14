const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    let currentMsg = JSON.parse(message);
    currentMsg.id = uuidv1();
    switch (currentMsg.type) {
      case 'postNotification':
        currentMsg.type = 'incomingNotification';
        break;
      case 'postMessage':
        currentMsg.type = 'incomingMessage';
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + data.type);
    }

    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(currentMsg));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
