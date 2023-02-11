import bodyParser from "body-parser";
import { BrowserWindow } from "electron";
import express from "express";

const getApp = (browserWindow: BrowserWindow) => {
  const app = express();

  app
    .use(bodyParser.json())
    .use("/submit", (req, res) => {
      browserWindow.webContents.send("3dmodel", req.body);
      console.log(req.body);

      res.send("ok!");
    })
    .use("/test", (req, res) => {
      const datastructure = {
        blocks: [
          [
            // Y = 0
            [0, 0, 1, 0, 0], // Z = 0
            [0, 0, 1, 1, 0], // Z = 1
            [0, 1, 1, 1, 0], // Z = 2
            [0, 1, 1, 0, 0], // Z = 3
            [0, 0, 0, 0, 0], // Z = 4
          ],
          [
            // Y = 1
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ],
          [
            // Y = 2
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ],
        ],
      } as const;

      browserWindow.webContents.send("3dmodel", datastructure);

      res.send("ok!");
    })
    .use((req, res) => {
      res.send("404!");
    });

  return app;
};

export { getApp };
