import HydraHandle from "./HydraPatch.js";
import xebraState from "./XebraConnector.js";
import VideoSwitcher from "./VideoSwitcher.js";

// const io = require('socket.io-client');
// var socket = io("http://localhost:9000");

xebraState.connect();
const hydra = new HydraHandle();
const videoSwitch = new VideoSwitcher([hydra, xebraState]);

videoSwitch.init().then(() => {
  hydra.run();
});


var btn = document.querySelector(".hydra-reset");

btn.addEventListener("click", (e) => {
  hydra.run(100);
});


function sendToMax(val) {
  xebraState.sendMessageToChannel("fromBrowser", val);
}

var muteState = 0;
var btn2 = document.querySelector(".max-ping");

btn2.addEventListener("click", (e) => {
  sendToMax(muteState);
  muteState = muteState ? 0 : 1;
});

var slide = document.querySelector("#frequency");
slide.addEventListener("input", (e) => {
  hydra.run(parseInt(e.target.value));
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