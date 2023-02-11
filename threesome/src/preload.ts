// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { writeFileSync } from "fs";
import { spawn } from "child_process";
import { sleep } from "./helper/sleep";
import robot from "@jitsi/robotjs";
import { Window as WindowControl } from "win-control";

const getUltimakerWindow = async () => {
  while (true) {
    const win = WindowControl.getByTitle("CE3PRO_model - UltiMaker Cura");
    if (win) {
      console.log("Found UltiMaker window!");
      return win;
    }
    console.log("Could not find UltiMaker window. Waiting for 1000ms.");
    await sleep(1000);
  }
};

const click = async () => {
  await sleep(100);
  robot.mouseToggle("down");
  await sleep(100);
  robot.mouseToggle("up");
  await sleep(100);
}

contextBridge.exposeInMainWorld("threesome", {
  on: (channel, callback) => {
    return ipcRenderer.on(channel, (event, ...data) => callback(...data));
  },
  off: (channel, callback) => {
    return ipcRenderer.off(channel, (event, ...data) => callback(...data));
  },
  save: async (stlData: string) => {
    // Write the STL to file
    writeFileSync("model.stl", stlData, { encoding: "utf-8" });

    // Open the STL in UltiMaker Cura
    spawn("C:\\Program Files\\UltiMaker Cura 5.2.2\\UltiMaker-Cura.exe", [
      "model.stl",
    ], {
      detached: true
    });

    // Wait for the main window to load
    const ultimakerWindow = await getUltimakerWindow();
    
    // Wait for the STL to load
    await sleep(2000);


    const bounds = ultimakerWindow.getDimensions();

    // Click on the SLICE then PRINT buttons.
    robot.moveMouse(bounds.right - 200, bounds.bottom - 55);
    await click();
    await sleep(5000);
    await click();

    return;
  },
});
