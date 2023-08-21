import path = require("path");
import { HandlerNames } from "../enums/runtime";

const HANDLERS_FOLDER = path.resolve(__dirname, "../../runtime/handlers");

export function getHandlerManifestPath(handlerName: HandlerNames): string {
  return path.resolve(HANDLERS_FOLDER, `${handlerName}/Cargo.toml`);
}
