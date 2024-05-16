# Audio Recorder

This is an Electron.js application that allows you to record audio from your device's speaker and microphone sources. The app provides a modern user interface built with Material-UI.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/audio-recorder.git
   ```

2. Navigate to the project directory:
```bash
cd audio-recorder
```

3. Install the dependencies:
```bash
npm install
```

4. Start the application:
```bash
npm start
```
This will launch the Electron app, and you should see the Audio Recorder window.

## Usage

1. Click on the "Get Audio Sources" button to retrieve the available audio sources.
2. Select the desired audio source from the dropdown menu.
3. Click on the "Get Microphone Sources" button to retrieve the available microphone sources.
4. Select the desired microphone source from the dropdown menu.
5. Click on the "Start Recording" button to begin recording audio from the selected sources. The recording will automatically stop after 5 seconds.
6. After the recording is finished, you can play back the recorded audio using the audio player provided.

## Folder Structure
The project has the following folder structure:
```
your-project/
  ├── node_modules/
  ├── src/
  │   ├── main.js
  │   ├── preload.js
  │   └── renderer/
  │       ├── index.html
  │       ├── index.js
  │       ├── App.js
  │       └── styles.css
  ├── package.json
  └── package-lock.json
```

- src/main.js: The main Electron process file.
- src/preload.js: The preload script for the Electron renderer process.
- src/renderer/index.html: The HTML file for the renderer process.
- src/renderer/index.js: The entry point for the renderer process.
- src/renderer/App.js: The main React component for the application.
- src/renderer/styles.css: The CSS styles for the application.

## Dependencies
The project relies on the following dependencies:

- electron: The framework for building cross-platform desktop applications using web technologies.
- @material-ui/core: The Material-UI library for building a modern user interface.
- react: The JavaScript library for building user interfaces.
- react-dom: The entry point to the DOM and server renderer for React.

## License
This project is licensed under the MIT License. See the LICENSE file for more 