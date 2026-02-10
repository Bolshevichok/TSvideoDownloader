import { Readable } from "node:stream";
import config from "./config.js";

export async function downloadVideo(url:string): Promise<{ stream: Readable | null; error?: string}> {
    try {
        const HOST = config.host_backend;
        const PORT = config.port_backend;
        const response = await fetch(`http://${HOST}:${PORT}/videos?url=${url}`);
        if (response.ok && response.body) {
            const stream = Readable.fromWeb(response.body as any);
            return {stream};
        } else {
            // Извлечь текст ошибки
            const errorText = await response.text();
            return {stream: null, error: errorText || `Ошибка ${response.status}`};
        }
    } catch (e){
        console.error(e);
        return { stream: null, error: "Ошибка сети или сервера" };
    }
}