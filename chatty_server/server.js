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

//Handles and broadcast mmessages to all connected clients
wss.handleMessages = msg => {
  const currentMsg = JSON.parse(msg);
  currentMsg.id = uuidv1();
  wss.handleNotifications(currentMsg);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(currentMsg));
    }
  });
};
//Send all conected users count to client-server
wss.sendConnectedUsers = () => {
  const connectedUsers = wss.clients.size;
  const userData = { type: 'userCount', users: 0 };
  wss.clients.forEach(client => {
    userData.users = connectedUsers;
    client.send(JSON.stringify(userData));
  });
};

// Handles Notifications type client/server
wss.handleNotifications = notification => {
  switch (notification.type) {
    case 'postNotification':
      notification.type = 'incomingNotification';
      break;
    case 'postMessage':
      notification.type = 'incomingMessage';
      break;
    default:
      // show an error in the console if the message type is unknown
      throw new Error('Unknown event type ' + notification.type);
  }
};

wss.on('connection', ws => {
  console.log('Client connected');
  wss.sendConnectedUsers();
  ws.on('message', message => {
    wss.handleMessages(message);
  });

  // Set up a callback for when a client closes the socket.
  ws.on('close', () => {
    //Updates users count when a user disconects
    wss.sendConnectedUsers();
    console.log('Client disconected');
  });
});
