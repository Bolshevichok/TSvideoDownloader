import type { Readable } from "node:stream";
export interface YTService {
    downloadVideo(url: string): Promise<Readable | null>;
}
export interface TTService {
    downloadVideo(url: string): Promise<Readable | null>;
}
export interface VKService {
    downloadVideo(url: string): Promise<Readable | null>;
}