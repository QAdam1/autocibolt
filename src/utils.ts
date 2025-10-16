import { writeFile } from 'fs/promises';
import { COOKIE_FILE_PATH, LOCAL_STORAGE_FILE_PATH } from './config';

export async function waitUntil(
    condition: () => Promise<boolean>,
    {
        timeout = 5000,
        interval = 200,
        timeoutMsg = 'waitUntil: condition not met in time',
    } = {}
): Promise<void> {
    const start = Date.now();

    while (true) {
        if (await condition()) return;
        if (Date.now() - start > timeout) {
            throw new Error(timeoutMsg);
        }
        await new Promise(res => setTimeout(res, interval));
    }
}

export async function writeWoltCookiesToFile(newCookies: unknown): Promise<void> {
    await writeFile(COOKIE_FILE_PATH, JSON.stringify(newCookies, null, 2), 'utf-8');
}

export async function writeWoltLocalStorageToFile(localStorage: unknown): Promise<void> {
    await writeFile(LOCAL_STORAGE_FILE_PATH, JSON.stringify(localStorage, null, 2), 'utf-8');
}

export async function decodeBase64(b64String: string): Promise<string> {
    return Buffer.from(b64String, 'base64').toString('utf-8');
}