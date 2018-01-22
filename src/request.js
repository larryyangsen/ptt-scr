import Request from 'request';
import storeSession from './store-session';
export default async () => {
    const jar = Request.jar();
    const request = Request.defaults({ jar });
    await storeSession(request);
    return request;
};
