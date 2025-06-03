import { RequestAPI, Response, Request as RequestType, CoreOptions, RequiredUriUrl } from 'request';

// Define the specific type for our RequestAPI instances, matching src/request.ts
type PttRequestAPI = RequestAPI<RequestType, CoreOptions, RequiredUriUrl>;

export default async (requestInstance: PttRequestAPI, url: string): Promise<string> =>
    new Promise((resolve, reject) => {
        requestInstance.get(url, (err: Error | null, res: Response, body: string) => {
            if (err) {
                reject(err);
            } else if (res.statusCode && res.statusCode >= 300) {
                // Handle HTTP errors (e.g., 404, 500)
                reject(new Error(`HTTP error ${res.statusCode} while fetching ${url}`));
            } else {
                resolve(body);
            }
        });
    });
