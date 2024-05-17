import { contextBridge } from 'electron';
import { desktopCapturer, process } from '@electron/remote';

contextBridge.exposeInMainWorld('electron', {
  desktopCapturer,
  process,
});