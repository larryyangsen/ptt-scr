import cheerio from 'cheerio';
import request from './request';
import get from './getUrlContent';

const url = 'https://www.ptt.cc/bbs/hotboards.html';

export default async () => {
    const session = await request();
    const hotHTML = await get(session, url);
    const hots = [];
    let $ = cheerio.load(hotHTML);
    $('.b-ent').each((i, el) => {
        $ = $.load(el);
        const name = $('.board-name').text();
        const title = $('.board-title').text();
        const count = $('.board-nuser').text();
        const boardClass = $('.board-class').text();
        hots.push({
            name,
            title,
            count,
            class: boardClass
        });
    });
    return hots;
};
