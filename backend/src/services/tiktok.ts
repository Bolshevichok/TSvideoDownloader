import type { TTService } from '../types/contentservice.js';
import { Readable } from 'node:stream';
import ytDlp from 'yt-dlp-exec';

export class TTcontent implements TTService {
    async downloadVideo(url: string): Promise<Readable | null> {
        try {
            const subprocess = (ytDlp as any).exec(url)
            return subprocess.stdout;
        } catch (error) {
            console.log("ERR TT: " + error);
            return null;
        }
    }
}