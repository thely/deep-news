import runHydraPatch from "./HydraPatch.js";
import xebraState from "./XebraConnector.js";

xebraState.connect();
runHydraPatch();

var btn = document.querySelector(".hydra-reset");

btn.addEventListener("click", (e) => {
  runHydraPatch(100);
});


function sendToMax(val) {
  xebraState.sendMessageToChannel("fromBrowser", val);
}

var pingVal = 0;
var btn2 = document.querySelector(".max-ping");

btn2.addEventListener("click", (e) => {
  sendToMax(pingVal);
  pingVal = pingVal ? 0 : 1;
});