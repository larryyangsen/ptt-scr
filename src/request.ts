import Request, { CookieJar, RequestAPI, CoreOptions, RequiredUriUrl, Request as RequestType } from 'request';
import storeSession from './store-session';

// Define the specific type for our RequestAPI instances
type PttRequestAPI = RequestAPI<RequestType, CoreOptions, RequiredUriUrl>;

export default async (): Promise<PttRequestAPI> => {
    const jar: CookieJar = Request.jar();
    const customRequest: PttRequestAPI = Request.defaults({ jar });
    await storeSession(customRequest); // storeSession will also expect PttRequestAPI
    return customRequest;
};
