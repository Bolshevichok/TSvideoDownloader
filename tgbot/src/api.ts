import type { Readable } from "node:stream";
import config from "./config.js";
import { configDotenv } from "dotenv";

const HOST = config.host_backend
const PORT = config.port_backend
export async function downloadVideo(url:string): Promise<Readable | null> {
    const file = fetch(`http://${HOST}:${PORT}/videos?`);

}