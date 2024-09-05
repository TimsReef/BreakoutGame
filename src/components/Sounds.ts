export enum Sound {
    wall = 800,
    paddle = 900,
    brick = 1000
}
export class Sounds {

    playSound(pulseHz: Sound): void {
        let sound: AudioContext = new AudioContext();
        //const o: OscillatorNode = sound.createOscillator();

        let osc = new OscillatorNode(sound, {
            type: "sine",
            frequency: pulseHz
        });

        //let gn: GainNode = sound.createGain();
        //osc.connect(gn);
        osc.type = "sine";
        osc.connect(sound.destination);
        osc.start(0);
        //gn.gain.exponentialRampToValueAtTime(0.00001, sound.currentTime + 0.08);
        osc.stop(.04);
    }
}