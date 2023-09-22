//create express server
const express = require('express');
const cors = require('cors');

//create express app
const app = express();

//set port
const port = process.env.PORT || 3001; 

//set up middleware
app.use(cors());
app.use(express.json());

//set up routes
app.use('/', (req, res) => res.sendFile('/testFile.html', { root: __dirname }));

const { WebSocketServer } = require('ws');
const sockserver = new WebSocketServer({ port: 443 });
sockserver.on('connection', ws => {
    console.log('New client connected!')
    ws.send('connection established')
    ws.on('close', () => console.log('Client has disconnected!'))
    ws.on('message', data => {
      sockserver.clients.forEach(client => {
        console.log(`distributing message: ${data}`)
        client.send(`${data}`)
      })
    })
    ws.onerror = function () {
      console.log('websocket error')
    }
   })

//set up server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
