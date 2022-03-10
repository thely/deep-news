import HydraHandle from "./HydraPatch.js";
import MaxConnector from "./XebraConnector.js";
import VideoSwitcher from "./VideoSwitcher.js";

//-------------------------------
// socket.io chat
//-------------------------------
try {
  const io = require('socket.io-client');
  var socket = io("http://localhost:8000");

  const input = document.querySelector("input.chat-input");
  const form = document.querySelector("form.chat-form");
  const messages = document.querySelector(".chat-messages ul");

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('message', input.value);
      input.value = '';
    }
  });

  socket.on('message', msg => {
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
  })
} catch (e) {
  console.log("no socket client to speak of today");
}


//-------------------------------
// starting patches, checking if Max or no
//-------------------------------
let maxConn, videoSwitch1, videoSwitch2;
const hydra1 = new HydraHandle("#hydra-large");
// const hydra2 = new HydraHandle("#hydra-small", 400, 300);
// console.log(hydra1);
// console.log(hydra2);
// console.log(hydra1);

try {
  maxConn = new MaxConnector();
  videoSwitch1 = new VideoSwitcher([hydra1, hydra2, xebraState]);
} catch (e) {
  videoSwitch1 = new VideoSwitcher([hydra1]);
  videoSwitch2 = new VideoSwitcher([hydra2]);
}

// videoSwitch1.init().then(() => {
//   console.log("first switch ready");
//   hydra1.run();
// });

// videoSwitch2.init().then(() => {
//   console.log("second switch ready");
//   hydra2.run4();
// });


var btn = document.querySelector(".hydra-reset");

btn.addEventListener("click", (e) => {
  hydra.run(100);
});


// function sendToMax(val) {
//   xebraState.sendMessageToChannel("fromBrowser", val);
// }

var muteState = 0;
var btn2 = document.querySelector(".max-ping");

// btn2.addEventListener("click", (e) => {
//   sendToMax(muteState);
//   muteState = muteState ? 0 : 1;
// });

var slide = document.querySelector("#frequency");
slide.addEventListener("input", (e) => {
  hydra1.run(parseInt(e.target.value));
});








// setupRetriever = (r) => {
  

//   // for (i = 0; i < r.total; i++) {
//   //   nextName = hostURL + r.folder + i + r.extension
//   //   console.log(nextName)
//   //   r.names.push(nextName)
//   // }
//   r.next = () => {
//     r.current = (r.current + 1) % r.names.length
//     return r.names[r.current]
//   }
//   r.random = () => {
//     r.current = (Math.ceil(Math.random() * r.names.length)) % r.names.length
//     return r.names[r.current]
//   }
//   r.filename = () => {
//     return r.names[r.current]
//   }
// }