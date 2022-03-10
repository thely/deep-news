// This serves the actual webpage. It's not the "server" that communicates
// between the two computers.
const fs = require("fs");
const path = require('path');

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('index.html')
});

// -----------------
// Socket connection
// -----------------
io.on('connection', socket => {
  console.log("a user connected");

  socket.on('message', msg => {
    io.emit('message', msg);
  })
});



// -----------------
// Complete video list
// -----------------
app.get('/videos', (req, res) => {
  fs.readdir(path.resolve(__dirname, "../assets"), (err, files) => {
    if (err) {
      console.log(err);
    }
    else {  
      files = files.filter((vid) => {
        if (vid.includes(".mp4") || vid.includes(".m4v") || vid.includes(".mov")) {
          return true;
        }
      });

      res.json({ videos: files });
    }
  });
});

// -----------------
// Actually server
// -----------------
http.listen(8000, () => {
  console.log('client on *:' + 8000);
});