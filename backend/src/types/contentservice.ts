export interface ContentService {
    downloadvideo(str: string): Promise<ReadableStream<Uint8Array>>;
}