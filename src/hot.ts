import cheerio from 'cheerio';
import request from './request';
import get from './getUrlContent';

const url = 'https://www.ptt.cc/bbs/hotboards.html';

export interface PttHotBoard { // Exporting
    name: string;
    title: string;
    count: string;
    boardClass: string;
    link?: string;
}

export default async (): Promise<PttHotBoard[]> => {
    const session = await request(); // session is RequestAPI
    const hotHTML = await get(session, url); // No longer needs 'as string'
    const hots: PttHotBoard[] = [];
    const $ = cheerio.load(hotHTML);
    const host = 'https://www.ptt.cc';

    $('.b-ent').each((i, el) => {
        const $el = $(el); // Use the existing $ to scope to the current element
        const name = $el.find('.board-name').text();
        const title = $el.find('.board-title').text();
        const count = $el.find('.board-nuser').text();
        const boardClass = $el.find('.board-class').text();
        const linkPath = $el.find('a.board').attr('href');
        const link = linkPath ? host + linkPath : undefined;

        hots.push({
            name,
            title,
            count,
            boardClass, // Renamed from 'class' to avoid reserved keyword issues
            link
        });
    });
    return hots;
};
