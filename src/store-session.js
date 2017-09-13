const over18url = 'https://www.ptt.cc/ask/over18';

export default async request =>
    new Promise((resolve, reject) => {
        request.post(
            over18url,
            {
                form: {
                    from: '/bbs/Gossiping/index.html',
                    yes: 'yes'
                }
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                }
                resolve(body);
            }
        );
    });
