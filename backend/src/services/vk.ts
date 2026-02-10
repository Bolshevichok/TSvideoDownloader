import type { Readable } from "node:stream";
import type { VKService } from "../types/contentservice.js";
import ytDlp from "yt-dlp-exec";
export class VKcontent implements VKService {
    async downloadVideo(url: string): Promise<Readable | null> {
        const filesize = await (ytDlp as any).exec(url, {
            print: ["%(filesize)s"]
        })
        const filesizeStr = filesize.stdout.trim();
        const filesizeint = parseInt(filesizeStr, 10);
        if (filesizeint>50*1024*1024){
            throw new Error("file too heavy") ;
        }
        else {
            try {
                console.log(`[VK] start download: ${url}`);
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
}