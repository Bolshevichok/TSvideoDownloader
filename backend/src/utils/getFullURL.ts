export async function getFullURL (url: string): Promise<string> {
    const fullURL = await fetch(url);
    return fullURL.url;
}