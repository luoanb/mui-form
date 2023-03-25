import * as fs from "fs";
import { doPromise } from "./utils";
const rowSplit = "\n";
export const setVersion = async (url: string) => {
  const fileBuffer = await doPromise<Buffer>((s, j) => {
    fs.readFile(url, (err, data) => {
      if (err) {
        j(err);
      } else {
        s(data);
      }
    });
  });
  console.log(fileBuffer.toString().split(rowSplit));
};
