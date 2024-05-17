import { app, BrowserWindow } from 'electron';
import { join } from 'path';
import { initialize, enable } from '@electron/remote/main';

initialize();

const isSingleInstance = app.requestSingleInstanceLock();

if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}

app.disableHardwareAcceleration();

const createWindow = async () => {
  const browserWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webviewTag: false,
      preload: join(__dirname, '../preload/index.js'),
    },
  });

  enable(browserWindow.webContents);

  if (process.env.VITE_DEV_SERVER_URL) {
    await browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    await browserWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  browserWindow.on('ready-to-show', () => {
    browserWindow.maximize();
    browserWindow.show();
  });
};

app.on('second-instance', () => {
  const browserWindow = BrowserWindow.getAllWindows()[0];

  if (browserWindow) {
    if (browserWindow.isMinimized()) {
      browserWindow.restore();
    }

    browserWindow.focus();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady()
  .then(createWindow)
  .catch((e) => console.error('Failed to create window:', e));