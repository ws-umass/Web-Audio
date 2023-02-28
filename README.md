# HTML5 Web Audio Template

Fixing the Web Audio autoplay block for Safari:

```javascript
async function load(file) {
   try {
      const response = await window.fetch(file);
      const arrayBuffer = await response.arrayBuffer();
      context.decodeAudioData(arrayBuffer, (data) => buffer = data);
   } catch (error) {
      console.error(error);
   }
}
```

Original version:

```javascript
// https://dobrian.github.io/cmp/topics/sample-recording-and-playback-with-web-audio-api/1.loading-and-playing-sound-files.html
function load(file) {
   let request = new XMLHttpRequest();
   request.open("GET", file);
   request.responseType = "arraybuffer";
   request.onload = () => {
      let undecodedAudio = request.response;
      context.decodeAudioData(undecodedAudio, (data) => buffer = data);
   }
   request.send();
}
```
