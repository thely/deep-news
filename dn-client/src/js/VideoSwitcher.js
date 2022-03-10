class VideoSwitcher {
  constructor(observers) {
    this.urlReq = "http://localhost:8000/videos";
    this.urlBase = "http://localhost:8000/assets";
    this.list = [];
    this.index = 0;
    this.players = [];
    this.numPlayers = 2;

    this.observers = !observers ? [] : observers;
  }

  async init() {
    return fetch(this.urlReq).then(response => response.json()).then(data => {
      this.list = data.videos;
      this.playerSetup();
    });
  }

  addObserver(o) {
    this.observers.push(o);
  }

  nextFile() {
    const fname = this.currentFile();
    this.index = (this.index + 1) % this.list.length;
    
    return fname;
  }

  currentFile() {
    const end = this.list[this.index];
    const fname = this.formatFile(end);

    return fname;
  }

  formatFile(f) {
    return this.urlBase + "/" + f;
  }

  playerSetup() {
    for (let i = 0; i < this.numPlayers; i++) {
      this.videoElement(i);
      this.videoEvents(i);
    }

    this.players[0].src = this.currentFile();
    this.players[0].autoplay = true;
    this.players[0].play();
  }

  videoElement(c) {
    let video = document.createElement("video");
    video.preload = true;
    video.crossOrigin = "anonymous";
    video.muted = true;

    this.players[c] = video;
  }

  videoEvents(c) {
    let p = this;
    
    this.players[c].onplaying = function(e) {
      // first, notify any observers about newly playing video
      for (let o of p.observers) {
        o.videoNotify({
          index: p.index,
          filename: p.players[c].src,
          player: p.players[c]
        });
      }
      
      // once one player starts playing, figure out what to load in the other one
      p.index = (p.index + 1) % p.list.length;
      var nextFileName = p.list[p.index];
      var nextPlayer = Math.abs(c - 1);

      p.players[nextPlayer].src = p.formatFile(nextFileName);
      p.players[nextPlayer].pause();
    };

    this.players[c].onended = function(e) {
      var nextPlayer = Math.abs(c - 1);
      p.players[nextPlayer].play();
    };
  }
}

export default VideoSwitcher;