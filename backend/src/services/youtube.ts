import { Innertube } from 'youtubei.js';
import type { ContentService } from '../types/contentservice.js';
export class YTcontent implements ContentService {
    async downloadvideo(str: string): Promise<ReadableStream<Uint8Array>> {
        const innertube = await Innertube.create();
        const endpoint = await innertube.resolveURL(str);
        const videoId = endpoint.payload.videoId;
        return innertube.download(videoId);
    }
}