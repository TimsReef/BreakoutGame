export enum Sound {
    wall = 800,
    paddle = 900,
    brick = 1000
}

 function unlockAudioContext(audioCtx: AudioContext): void {
        if (audioCtx.state !== 'suspended') return;
        const b = document.body;
        const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
        events.forEach(e => b.addEventListener(e, unlock, false));
        function unlock() { audioCtx.resume().then(clean); }
        function clean() { events.forEach(e => b.removeEventListener(e, unlock)); }
}

const sound: AudioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)({ latencyHint: "interactive" });

export class Sounds {

    playSound(pulseHz: Sound): void {
        unlockAudioContext(sound);
        const osc: OscillatorNode = sound.createOscillator();
        osc.type = "sine";
        osc.frequency.value = pulseHz;
        const gn: GainNode = sound.createGain();
        gn.gain.setValueAtTime(0, sound.currentTime + 0.04);
        osc.connect(gn);
        gn.connect(sound.destination);
        osc.start(0);
    }
}