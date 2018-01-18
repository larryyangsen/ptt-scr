import Request from 'request';
import storeSession from './store-session';
const jar = Request.jar();
const request = Request.defaults({ jar });
export default async () => {
    await storeSession(request);
    return request;
};
