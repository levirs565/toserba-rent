import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import path from "node:path";

const basePath = path.resolve(process.cwd(), process.env.STORAGE_PATH ?? ".storage");

export const storage = createStorage({
  driver: fsDriver({
    base: basePath,
  }),
});
