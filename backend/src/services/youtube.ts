import type { ContentService } from '../types/contentservice.js';
import ytDlp from 'yt-dlp-exec';
export class YTcontent implements ContentService {
    async downloadvideo(url: string): Promise<any> {
        console.log("YT-DLP START!!!: "+url)

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
        subprocess.stderr?.on('data', (data: any) => {
            console.error('[YT-DLP ERROR]:', data.toString());
        });

        if (!subprocess.stdout) {
             throw new Error("No stdout from yt-dlp");
        }
        return subprocess.stdout;
    }
}