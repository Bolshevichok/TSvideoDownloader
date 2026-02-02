import type { SocialNetwork } from "../types/socialnetwork.js";

export function socialnetworkCheck(url: string): SocialNetwork {
    if(url.includes("tiktok")){
        return "tiktok"
    } else if (url.includes("vk")) {
        return "vk"
    } else if (url.includes("youtube")) {
        return "youtube"
    } else {
        throw Error("unsupported social network")
    }
}