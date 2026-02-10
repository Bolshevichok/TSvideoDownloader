import express from "express";
import { socialnetworkCheck } from "./utils/socialnetworkcheck.js";
import { YTcontent } from "./services/youtube.js";
import { urlChecker } from "./utils/urlChecker.js";
import { TTcontent } from "./services/tiktok.js";
import { VKcontent } from "./services/vk.js";

export function setupRoutes(app: express.Application){
    app.get("/videos", async (req , res) => {
        const url = req.query.url as string;
        if (!url || !urlChecker(url)) {
            return res.status(400).send("Missing URL");
        };

        res.setHeader("Content-type", "application/octet-stream");
        res.setHeader("Content-Disposition", "attachment; filename='file.mp4'");
        
        const platform = socialnetworkCheck(url);
        let service: any;
        if (platform === "youtube") {
            service = new YTcontent();
        } else if (platform === "tiktok") {
            service = new TTcontent()
        } else if (platform === "vk"){
            service = new VKcontent()
        } else {
            res.status(400).send("Unsupported platform");
        }
        try {
            const stream = await service.downloadVideo(url);
            if (!stream){
                return res.status(404).send("Video not found or unavailable");
            }
            stream.pipe(res);
        } catch (error: any) {
            console.error("Download failed:", error);
            if (error.message==="too heavy file") {
                res.status(413).send("too heavy file")
            } else {
                res.status(500).send("Download failed: " + (error?.message ?? String(error)));
            }
        };
    })
}