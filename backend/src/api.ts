import express from "express";
import { socialnetworkCheck } from "./utils/socialnetworkcheck.js";
import { YTcontent } from "./services/youtube.js";
import { urlChecker } from "./utils/urlChecker.js";
import { TTcontent } from "./services/tiktok.js";

export function setupRoutes(app: express.Application){
    app.get("/videos", async (req , res) => {
        const url = req.query.url as string;
        if (!url || !urlChecker(url)) {
            return res.status(400).send("Missing URL")
        }

        res.setHeader("Content-type", "video/mp4")
        res.setHeader("Content-Disposition", "attachment; filename='file.mp4'")
        
        const platform = socialnetworkCheck(url);
        
        if (platform === "youtube") {
            const service = new YTcontent()
            try {
                const stream = await service.downloadVideo(url)
                if (!stream){
                    return res.status(404).send("Video not found or unavailable");
                }
                stream.pipe(res);
            } catch (error: any) {
                console.error("Download failed:", error);
                res.status(500).send("Download failed: " + (error?.message ?? String(error)));
            } 
        } else if (platform === "tiktok") {
            const service = new TTcontent()
            try {
                const stream = await service.downloadVideo(url)
                if(!stream){
                    return res.status(404).send("Video not found or unavaiable")
                }
                res.setHeader("Content-type", "application/octet-stream")
                res.setHeader("Content-Disposition", "attachment; filename='tiktok_content'")
                stream.pipe(res);
            } catch (error: any) {
                console.error("Download failed:", error);
                res.status(500).send("Download failed: " + (error?.message ?? String(error)));
            }
        } else {
            res.status(400).send("Unsupported platform")
        }
    })
}