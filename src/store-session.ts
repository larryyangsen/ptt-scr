import { RequestAPI, Response, CoreOptions, Request as RequestType, RequiredUriUrl } from 'request';

// Define the specific type for our RequestAPI instances, matching src/request.ts
type PttRequestAPI = RequestAPI<RequestType, CoreOptions, RequiredUriUrl>;

const over18url = 'https://www.ptt.cc/ask/over18';

interface Over18Form {
    from: string;
    yes: 'yes';
}

export default async (requestInstance: PttRequestAPI): Promise<string> =>
    new Promise((resolve, reject) => {
        const options: CoreOptions = {
            form: {
                from: '/bbs/Gossiping/index.html', // Example from URL, can be dynamic
                yes: 'yes'
            } as Over18Form // It's good to type the form data structure
        };

        requestInstance.post(
            over18url,
            options,
            (err: Error | null, res: Response, body: string) => {
                if (err) {
                    reject(err);
                } else if (res.statusCode && res.statusCode >= 300 && res.statusCode !== 302) {
                    // PTT over18 check often results in a 302 redirect, which is not an error here.
                    reject(new Error(`HTTP error ${res.statusCode} while posting to ${over18url}`));
                } else {
                    resolve(body);
                }
            }
        );
    });
