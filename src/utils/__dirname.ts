import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export default function __dirname(metaUrl: string, ...path: string[]) {
  return join(dirname(fileURLToPath(metaUrl)), ...path);
}
