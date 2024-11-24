const { spawn } = require('child_process');
const path = require('path');

const rtmpsUrl = ''
const streamKey = ''

const inputVideo = path.join(__dirname, 'namafile.mp4');

const ffmpeg = spawn('ffmpeg', [
  '-re',
  '-stream_loop', '-1',
  '-i', inputVideo,
  '-c:v', 'libx264',
  '-preset', 'veryfast',
  '-tune', 'zerolatency',
  '-b:v', '1000k',
  '-g', '30',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-f', 'flv',
  '-max_delay', '0',
  `${rtmpsUrl}${streamKey}`,
]);

ffmpeg.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ffmpeg.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ffmpeg.on('close', (code) => {
  console.log(`FFmpeg process exited with code ${code}`);
});
