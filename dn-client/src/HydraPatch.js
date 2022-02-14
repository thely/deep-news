const Hydra = require("hydra-synth");
let hydra;


class HydraHandle {
  constructor() {
    hydra = new Hydra({ detectAudio: false });
  }

  // Central function for the Hydra synth.
  run(base) {
    base = base ? base : 4;
    console.log("inside run: " + base);

    // s0.initVideo("/assets/miami_rubio.mp4");
    // src(s0).out()
    osc(base, 0.1, 1.2).diff(src(s0)).out();
    // osc(() => (100 * Math.sin(time * 0.1))).out()
  }

  videoNotify(data) {
    console.log("notify hydra");
    s0.init({ src: data.player, dynamic: true });
  }
}


// class VideoPicker {
//   constructor(hyLink) {
//     this.urlReq = "http://localhost:8000/videos";
//     this.urlBase = "http://localhost:8000/assets";
//     this.list = [];
//     this.index = 0;
//     this.players = [];
//     this.numPlayers = 2;
//   }

//   async getFilenames() {
//     return fetch(this.urlReq).then(response => response.json()).then(data => {
//       this.list = data.videos;
//       console.log(this.list);
//     });
//   }

//   nextFile() {
//     const fname = this.currentFile();
//     this.index = (this.index + 1) % this.list.length;
    
//     return fname;
//   }

//   currentFile() {
//     const end = this.list[this.index];
//     const fname = this.formatFile(end);

//     return fname;
//   }

//   formatFile(f) {
//     return this.urlBase + "/" + f;
//   }

//   playerSetup() {
//     for (let i = 0; i < this.numPlayers; i++) {
//       this.videoElement(i);
//       this.videoEvents(i);
//     }

//     this.players[0].src = this.currentFile();
//     this.players[0].autoplay = true;
//   }

//   videoElement(c) {
//     let video = document.createElement("video");
//     video.preload = true;
//     video.crossOrigin = "anonymous";
//     video.muted = true;

//     this.players[c] = video;
//   }

//   videoEvents(c) {
//     let p = this;
    
//     this.players[c].onplaying = function(e) {
//       // once one player starts playing, figure out what to load in the other one
//       p.index = (p.index + 1) % p.list.length;
//       var nextFileName = p.list[p.index];
//       var nextPlayer = Math.abs(c - 1);

//       p.players[nextPlayer].src = p.formatFile(nextFileName);
//       p.players[nextPlayer].pause();

//       s0.init({ src: p.players[c], dynamic: true });
//     };

//     this.players[c].onended = function(e) {
//       var nextPlayer = Math.abs(c - 1);
//       p.players[nextPlayer].play();
//     };
//   }
// }

// let vidPicker = new VideoPicker();
// vidPicker.getFilenames().then(() => {
//   vidPicker.playerSetup();
// });

export default HydraHandle;