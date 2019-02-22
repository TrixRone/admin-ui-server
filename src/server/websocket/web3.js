const config = require('../config');

var WebSocketServer = require('ws').Server;
  wss = new WebSocketServer({port: config.WEBSOCKET_PORT})

wss.on('connection', function (ws) {

  ws.on('message', function (message) {
    console.log('received: %s', message)
  });
  ws.on('close', function (ws) {
    console.log((new Date()) + " Peer disconnected.");
  });
});
wss.sendNewuser = (email, password) => {
  const obj = {
    email: email,
    password: password,
    rs: {
      name: {
        sec: 123,
        area: 15.40
      }
    }
  };
  wss.clients.forEach(p => {
    p.send(JSON.stringify(obj));
  })
};

module.exports = wss;
