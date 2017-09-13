import xray from 'x-ray';
import Request from 'request';
import storeSession from './store-session';
import get from './getUrlContent';
import scrapList from './scrap-list';

const jar = Request.jar();
const request = Request.defaults({ jar });
const list = [];

/**
 *  @param boardName string
 *  @param pages number
 */

export default async (
    boardName = 'Gamesale',
    pageCounts = 3,
    startPage = '',
    categoryPatten = /\[(.+)\]/
) => {
    const mainUrl = 'https://www.ptt.cc';
    let boardUrl = `${mainUrl}/bbs/${boardName}/index${startPage}.html`;

    await storeSession(request);
    for (let i = 0; i < pageCounts; i++) {
        const html = await get(request, boardUrl);
        const titleList = await scrapList(html, categoryPatten);
        boardUrl = `${mainUrl}/bbs/${boardName}/index${titleList.prePageNumber}.html`;
        list.push(...titleList.items);
    }

    return { prePage: boardUrl, list };
};
