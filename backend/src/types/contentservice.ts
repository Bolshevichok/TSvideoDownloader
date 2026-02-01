import type { Readable } from "node:stream";
export interface YTService {
    downloadVideo(str: string): Promise<Readable | null>;
}
export interface TTService {
    downloadVideo(str: string): Promise<Readable | null>;
}