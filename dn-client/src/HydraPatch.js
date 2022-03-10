const Hydra = require("hydra-synth");
let hydra;


class HydraHandle {
  constructor() {
    this.canvas = document.querySelector("canvas");
    hydra = new Hydra({ 
      detectAudio: false, 
      width: 1280,
      height: 720,
      canvas: this.canvas
    });

    // resize(this.canvas.width, this.canvas.height);
    
    setResolution(window.innerWidth, window.innerHeight);
  }

  // Central function for the Hydra synth.
  run(base) {
    base = base ? base : 4; // alter value to go faster

    osc(base, 0.1, 1.2).diff(src(s0)).out();
    // osc(() => (100 * Math.sin(time * 0.1))).out()
  }

  videoNotify(data) {
    console.log("notify hydra");
    s0.init({ src: data.player, dynamic: true });
  }
}

export default HydraHandle;