// Xebra is used to communicate between Max and the browser.
// All that communication happens here.

const Xebra = require("xebra.js");

var options = {
  hostname : "127.0.0.1", // localhost
  port : 8086,
  supported_objects : [
    "button"
  ]
};

var xebraState = new Xebra.State(options);

xebraState.videoNotify = function(data) {
  console.log("notify max");
  xebraState.sendMessageToChannel("fromBrowser", data);
}


// --------------- If we want communication from Max to browser
// xebraState.on("channel_message_received", function(chan, msg) {
//   if (chan === "toBrowser") {
//     document.getElementById("fromMax").innerHTML = msg;
//   }
// });


// --------------- Example for translating in-patch buttons to the browser

// Do something when a button gets added to the Max patcher
xebraState.on("object_added", function(object) {
  if (object.type === "button") addHTMLButton(object);
});

// Do something when a button is removed
xebraState.on("object_removed", function(object) {
  if (object.type === "button") removeHTMLButton(object);
});

xebraState.on("object_changed", function(object, param) {
  if (object.type === "button") {
    if (param.type === "bgcolor") {
      var button = document.getElementById("button-" + object.id);
      button.style.backgroundColor = colorToHex(param.value);
    }
  }
});

function addHTMLButton(object) {
  var newButton = document.createElement("button");
  newButton.id = "button-" + object.id;
  newButton.onmousedown = function() {
    object.setParamValue("value", 1);
  };
  newButton.onmouseup = function() {
    object.setParamValue("value", 0);
  };
  newButton.appendChild(document.createTextNode("Button " + object.id));
  document.getElementById("container").appendChild(newButton);
}

function removeHTMLButton(object) {
  var button = document.getElementById("button-" + object.id);
  button.parentNode.removeChild(button);
}

function colorToHex(colorArray) {
  return (
    "#" +
    Math.floor(colorArray[0] * 255).toString(16) +
    Math.floor(colorArray[1] * 255).toString(16) +
    Math.floor(colorArray[2] * 255).toString(16)
  );
}

export default xebraState;