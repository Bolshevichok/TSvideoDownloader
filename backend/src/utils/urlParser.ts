import type { SocialNetwork } from "../types/socialnetwork.js";

export function urlParser(str: string): SocialNetwork {
    if(str.search("tiktok")){
        return "tiktok"
    } else if (str.search("vk")) {
        return "vk"
    } else if (str.search("youtube")) {
        return "youtube"
    } else {
        return Error("unsupported url")
    }
}