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
                res.setHeader("Content-type", "video/mp4")
                res.setHeader("Content-Disposition", "attachment; filename='file.mp4'")
                stream.pipe(res);
            } catch (error: any) {
                console.error("Download failed:", error);
                if (error?.response) {
                    console.error("Status:", error.response.status);
                    console.error("Headers:", error.response.headers);
                    console.error("Body:", error.response.data ?? error.response.body ?? error.response.text);
                }
                res.status(500).send("Download failed: " + (error?.message ?? String(error)));
            } 
        } else {
                res.status(400).send("Unsupported platform")
        }
    })
}