const mainBox = document.getElementById("mainBox");
const startButton = document.getElementById("main");

async function main() {
   let organ = {
      A4: "./samples/organ/A4.mp3",
      C4: "./samples/organ/C4.mp3"
   }

   let piano = {
      A4: "./samples/piano/A4.mp3",
      C4: "./samples/piano/C4.mp3"
   }

   let saxophone = {
      A4: "./samples/saxophone/A4.mp3",
      C4: "./samples/saxophone/C4.mp3"
   }

   let violin = {
      A4: "./samples/violin/A4.mp3",
      C4: "./samples/violin/C4.mp3"
   }

   let context = new AudioContext();
   let gainNode = context.createGain();
   let au = context.createBufferSource();
   let buffer = null;

   gainNode.connect(context.destination);
   gainNode.gain.value = 1;

   // https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html
   async function load(file) {
      try {
         const response = await window.fetch(file);
         const arrayBuffer = await response.arrayBuffer();
         context.decodeAudioData(arrayBuffer, (data) => buffer = data);
      } catch (error) {
         console.error(error);
      }
   }

   function beep(time) {
      au.buffer = buffer;
      au.connect(gainNode);

      au.start(0);
      au.stop(context.currentTime + time);

      au = null;
      au = context.createBufferSource();
   }

   function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
   }

   function getRandomInstrument() {
      return Math.floor(Math.random() * 4);
   }

   function getRandomMode() {
      return Math.floor(Math.random() * 3);
   }

   async function mode_1() {
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.2);
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.2);
   }

   async function mode_2() {
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.6);
   }

   async function mode_3() {
      await delay(1000);
      beep(0.2);
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.6);
      await delay(1000);
      beep(0.6);
   }

   mainBox.innerHTML = "";
   let html = `<button id="stop">Stop</button>`
   mainBox.innerHTML = html;
   const stopButton = document.getElementById("stop");
   stopButton.addEventListener("click", () => location.reload(true));

   let modeList = [mode_1, mode_2, mode_3];
   let instrumentList = [organ, piano, saxophone, violin];
   let i = 0;
   while (i < 30) {
      let index = getRandomMode();
      let mode = modeList[index];
      let instrument = instrumentList[getRandomInstrument()].A4;
      await load(instrument);
      let j = 0;
      while (j < 24) {
         console.log(index + "[" + instrument.split("/")[2] + "]");
         mode();
         await delay(10000);
         ++j;
      }
      await delay(1200000);
      ++i;
   }
}

startButton.addEventListener("click", main);
