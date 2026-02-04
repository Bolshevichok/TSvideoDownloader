import type { Readable } from "node:stream";
import type { VKService } from "../types/contentservice.js";
import ytDlp from "yt-dlp-exec";
export class VKcontent implements VKService {
    async downloadVideo(url: string): Promise<Readable | null> {
        try {
            console.log(`[YT] start download: ${url}`);
            const subprocess = (ytDlp as any).exec(url, {
                output: "-",
            });
            return subprocess.stdout;
        } 
        catch (error) {
            console.log("YT: "+error);
            return null;
        }
    }
}