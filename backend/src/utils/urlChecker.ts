export function urlChecker(str: string): boolean {
    const url = new URL(str)
    if (url.protocol !== 'http:' && url.protocol !== 'https:'){
        return false;
    }
    if (!url.hostname) {
        return false;
    }
    return true;
}