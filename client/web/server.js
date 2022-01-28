// This serves the actual webpage. It's not the "server" that communicates
// between the two computers.

const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: app.get('views') })
})

http.listen(8000, () => {
  console.log('listening on *:' + 8000);
});