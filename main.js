const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Correctly link to preload.js
      contextIsolation: true, // Ensure contextIsolation is enabled
      nodeIntegration: false // Ensure nodeIntegration is disabled
    }
  });

  win.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Audio Files', extensions: ['mp3'] }]
  });
  return result.filePaths[0];
});

ipcMain.handle('transcribe-audio', async (event, filePath) => {
  return new Promise((resolve, reject) => {
    // Construct the command to activate the virtual environment and run the transcription script
    const command = `python whisper-transcriber.py "${filePath}"`;

    console.log('Executing command:', command); // Debug log

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing command:', error); // Log command error
        reject(`Error: ${stderr}`);
      } else {
        console.log('Command output:', stdout); // Debug log
        resolve(stdout.trim());
      }
    });
  });
});

