import { Readable } from "node:stream";
import config from "./config.js";

export async function downloadVideo(url:string): Promise<Readable | null> {
    try {
        const HOST = config.host_backend;
        const PORT = config.port_backend;
        const response = await fetch(`http://${HOST}:${PORT}/videos?url=${url}`);
        if (!response.ok || !response.body) return null;
        const stream = Readable.fromWeb(response.body as any);
        return stream;
    } catch (e){
        console.error(e);
        return null;
    }
}