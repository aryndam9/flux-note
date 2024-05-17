import { useState } from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { startRecording, stopRecording } from './utils/audioRecorder';

const App = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleStartRecording = async () => {
    setIsRecording(true);
    await startRecording();
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    await stopRecording();
  };

  return (
    <Container maxWidth="sm" className="mt-8">
      <Box className="text-center">
        <Typography variant="h4" component="h1" gutterBottom>
          Audio Recorder
        </Typography>
        <Button
          variant="contained"
          color={isRecording ? 'secondary' : 'primary'}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          className="mt-4"
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </Box>
    </Container>
  );
};

export default App;