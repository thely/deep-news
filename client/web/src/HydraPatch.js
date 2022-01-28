const Hydra = require("hydra-synth");
const hydra = new Hydra({ detectAudio: false });


// Central + exported function for the Hydra synth.
function runHydraPatch(base) {
  base = base ? base : 4;
  osc(base, 0.1, 1.2).out();
}


export default runHydraPatch;