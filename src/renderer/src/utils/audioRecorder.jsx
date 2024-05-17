let mediaRecorder;
let audioChunks = [];

export const startRecording = async () => {
  try {
    const sources = await window.electron.desktopCapturer.getSources({ types: ['window', 'screen'] });
    const audioSource = sources.find((source) => source.name === 'Microphone');

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: audioSource.id,
        },
      },
    });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };

    mediaRecorder.start();
  } catch (error) {
    console.error('Error starting recording:', error);
  }
};

export const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
  }
};