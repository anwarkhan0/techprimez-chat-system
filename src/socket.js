import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:443/';
//   const webSocket = new WebSocket('ws://localhost:443/');
//   webSocket.onmessage = (event) => {
//     console.log(event)
//     document.getElementById('messages').innerHTML += 
//       'Message from server: ' + event.data + "<br>";
//   };
//   webSocket.send('hello')

export const socket = io('ws://localhost:443/');