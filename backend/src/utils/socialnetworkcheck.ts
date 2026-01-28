import type { SocialNetwork } from "../types/socialnetwork.js";

export function socialnetworkCheck(str: string): SocialNetwork {
    if(str.includes("tiktok")){
        return "tiktok"
    } else if (str.includes("vk")) {
        return "vk"
    } else if (str.includes("youtube")) {
        return "youtube"
    } else {
        return Error("unsupported url")
    }
}