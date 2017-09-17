import Request from 'request';
import storeSession from './store-session';
import get from './getUrlContent';
import scrapList from './list';
import scrapContent from './content';

const jar = Request.jar();
const request = Request.defaults({ jar });
const items = [];

/**
 *  @param boardName {string}
 *  @param pageCounts {number} 往前走幾頁 default:3
 *  @param startPage {number} 開始的頁數  default:''
 *  @param categoryPatten {RegExp} 發文分類 正則表達式規則 default: /\[(.+)\]/
 */

export default async (
    {
        boardName = 'Gossiping',
        pageCounts = 3,
        startPage = 0,
        categoryPatten = /\[(.+)\]/,
        isScrapContent = false
    } = {}
) => {
    const mainUrl = 'https://www.ptt.cc';
    let boardUrl = `${mainUrl}/bbs/${boardName}/index${startPage || ''}.html`;

    await storeSession(request);
    for (let i = 0; i < pageCounts; i++) {
        const html = await get(request, boardUrl);
        const titleList = scrapList(html, categoryPatten);
        boardUrl = `${mainUrl}/bbs/${boardName}/index${titleList.prePageNumber}.html`;
        items.push(...titleList.items);
    }
    if (isScrapContent) {
        for (const item of items) {
            if (item.link) {
                const contentHTML = await get(request, item.link);
                const content = await scrapContent(contentHTML);
                Object.assign(item, { content });
            }
        }
    }
    return { prePage: boardUrl, items };
};
