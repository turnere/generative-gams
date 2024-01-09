import * as Tone from 'tone';

const sampler = new Tone.Sampler({
  baseUrl: '/vsco2-ce/upright-piano/',
  urls: {
    "A0": "a0.wav",
    "C#1": "csharp1.wav",
    "F1": "f1.wav",
    "C#2": "csharp2.wav",
    "F2": "f2.wav",
    "A2": "a2.wav",
    "C#3": "csharp3.wav",
    "F3": "f3.wav",
    "A3": "a3.wav",
    "C#4": "csharp4.wav",
    "F4": "f4.wav",
    "A4": "a4.wav",
    "C#5": "csharp5.wav",
    "F5": "f5.wav",
    "A5": "a5.wav",
    "C#6": "csharp6.wav",
    "F6": "f6.wav",
    "A6": "a6.wav",
    "C#7": "csharp7.wav",
    "F7": "f7.wav",
    "A7": "a7.wav",
    "C8": "c8.wav"
  },
  volume: -16,
  onload: function () {
    Tone.Transport.start();
  },
});

const freeverb = new Tone.Freeverb();
sampler.connect(freeverb);
freeverb.toDestination();
const reverbControllerLfo = new Tone.LFO({ min: 0, max: 1, frequency: 0.25 });
reverbControllerLfo.connect(freeverb.wet);
reverbControllerLfo.start();

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function scheduleRandomRepeat(scheduledFunction, minDelay, maxDelay, startTime = getRandomBetween(minDelay, maxDelay)) {
  Tone.Transport.scheduleOnce(function(time) {
    scheduledFunction(time);
    const delay = getRandomBetween(minDelay, maxDelay);
    scheduleRandomRepeat(scheduledFunction, minDelay, maxDelay, time + delay);
  }, startTime);
}

scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('F4', time);
  console.log('F4');
  document.getElementById("note-played").value = 'F4';
}, 15, 30, getRandomBetween(0, 5));
scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('Ab4', time);
}, 15, 30, getRandomBetween(0, 5));
scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('C5', time);
}, 15, 30, getRandomBetween(0, 15));
scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('Db5', time);
}, 15, 30, getRandomBetween(0, 15));
scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('Eb5', time);
}, 15, 30);
scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('F5', time);
}, 15, 30);
scheduleRandomRepeat(function(time) {
  sampler.triggerAttack('Ab5', time);
}, 15, 30);