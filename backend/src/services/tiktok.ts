import type { TTService } from '../types/contentservice.js';
import { Readable } from 'node:stream';
import ytDlp from 'yt-dlp-exec';
import { getFullURL } from '../utils/getFullURL.js';

export class TTcontent implements TTService {
    async downloadVideo(url: string): Promise<Readable | null> {
        try {
            console.log(`[TT] start download: ${url}`);
            const subprocess = (ytDlp as any).exec(url, {
                output: "-",
                format: "bestvideo*+bestaudio/best",
                mergeOutputFormat: "mp4",
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                quiet: true,
                noProgress: true,
                postprocessorArgs: [
                    "Merger: -movflags frag_keyframe+empty_moov"
                ],
                addHeader: "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            });
            return subprocess.stdout;   
        } catch (error) {
            console.log("ERR TT: " + error);
            return null;
        }
    }
    async downloadIMG(str: string): Promise<Readable[] | null> {
        return null;
    }
}