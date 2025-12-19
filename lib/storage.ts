import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import vercelBlobDriver from "unstorage/drivers/vercel-blob";
import path from "node:path";

const useVercelBlob = process.env.USE_VERCEL_BLOB == "true";
const basePath = path.resolve(
  process.cwd(),
  process.env.STORAGE_PATH ?? ".storage"
);

export const storage = createStorage({
  driver: useVercelBlob
    ? vercelBlobDriver({
        access: "public",
      })
    : fsDriver({
        base: basePath,
      }),
});
