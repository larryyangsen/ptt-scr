export default async (request, url) =>
    new Promise((resolve, reject) => {
        request.get(url, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
