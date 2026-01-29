import type { ContentService } from '../types/contentservice.js';
import ytDlp from 'yt-dlp-exec';
export class YTcontent implements ContentService {
    async downloadvideo(url: string): Promise<any> {
        console.log("YT-DLP START!!!: "+url)

        const subprocess = (ytDlp as any).exec(url, {
            output: "-",
            format: "best[ext=mp4]",
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true
        });

        return subprocess.stdout;
    }
}