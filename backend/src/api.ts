import express from "express";
import { Readable } from "node:stream";
import { socialnetworkCheck } from "./utils/socialnetworkcheck.js";
import { YTcontent } from "./services/youtube.js";

export function setupRoutes(app: express.Application){
    app.get("/videos", async (req , res) => {
        const url = req.query.url as string;
        if (!url) {
            return res.status(400).send("Missing URL")
        }
        const platform = socialnetworkCheck(url);
        if (platform === "youtube") {
            const service = new YTcontent()
            try {
                const stream = await service.downloadvideo(url)
                const nodeStream = Readable.fromWeb(stream as any);
                res.setHeader("Content-type", "application/octet-stream")
                res.setHeader("Content-Disposition", "attachment; filename='file.mp4'")
                nodeStream.pipe(res);
            } catch (error) {
                res.status(500).send("Download failed")
            } 
        } else {
                res.status(400).send("Unsupported platform")
        }
    })
}