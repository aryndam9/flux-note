// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import adapter from 'webrtc-adapter';

function App() {
  const [devices, setDevices] = useState([]);
  const [micDeviceId, setMicDeviceId] = useState('');
  const [speakerDeviceId, setSpeakerDeviceId] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      const audioDevices = deviceInfos.filter((device) => device.kind === 'audioinput' || device.kind === 'audiooutput');
      setDevices(audioDevices);
    });
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    audioChunks.current = [];
    navigator.mediaDevices.getUserMedia({ audio: { deviceId: micDeviceId } }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.start();
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">FluxNote</Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        Audio Recorder
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="mic-select-label">Microphone</InputLabel>
        <Select
          labelId="mic-select-label"
          value={micDeviceId}
          onChange={(e) => setMicDeviceId(e.target.value)}
        >
          {devices.filter(device => device.kind === 'audioinput').map((device) => (
            <MenuItem key={device.deviceId} value={device.deviceId}>
              {device.label || `Microphone ${device.deviceId}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="speaker-select-label">Speaker</InputLabel>
        <Select
          labelId="speaker-select-label"
          value={speakerDeviceId}
          onChange={(e) => setSpeakerDeviceId(e.target.value)}
        >
          {devices.filter(device => device.kind === 'audiooutput').map((device) => (
            <MenuItem key={device.deviceId} value={device.deviceId}>
              {device.label || `Speaker ${device.deviceId}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </Container>
  );
}

export default App;
