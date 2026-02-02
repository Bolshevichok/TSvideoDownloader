import axios from "axios"
import { load } from "cheerio"
export async function parseTTForImg(url: string) {
    const html = (await axios.get(url)).data;
    const $ = load(html);
    const clipElement = $("div.swiper");
    const images = $(clipElement).find("img");
    return images;
};