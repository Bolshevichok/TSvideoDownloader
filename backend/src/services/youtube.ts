import type { YTService } from '../types/contentservice.js';
import ytDlp from 'yt-dlp-exec';
import type { Readable } from 'node:stream';
export class YTcontent implements YTService {
    async downloadVideo(url: string): Promise<Readable | null> {
        try {
            const subprocess = (ytDlp as any).exec(url, {
                output: "-",
                
                format: "best[height<=720][ext=mp4]/bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]",
                mergeOutputFormat: "mp4",
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                
                postprocessorArgs: [
                    "Merger: -movflags frag_keyframe+empty_moov"
                ],
                addHeader: "user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            });
            return subprocess.stdout;
        } 
        catch (error) {
            console.log(error);
            return null;
        }
    }
}