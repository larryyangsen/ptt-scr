import request from './request';
import storeSession from './store-session';
import get from './getUrlContent';
import scrapList from './list';
import scrapContent from './content';

const mainUrl = 'https://www.ptt.cc';

/**
 *  @param boardName {string}
 *  @param pageCounts {number} 往前走幾頁 default:3
 *  @param startPage {number} 開始的頁數  default:''
 *  @param categoryPatten {RegExp} 發文分類 正則表達式規則 default: /\[(.+)\]/
 */

export default async ({
    boardName = 'Gossiping',
    pageCounts = 3,
    startPage = 0,
    categoryPatten = /\[(.+)\]/,
    isScrapContent = false
} = {}) => {
    let boardUrl = `${mainUrl}/bbs/${boardName}/index${startPage || ''}.html`;
    let prePageNumber = 0;
    const items = [];

    const session = await request();
    for (let i = 0; i < pageCounts; i++) {
        const html = await get(session, boardUrl);
        const titleList = scrapList(html, categoryPatten);
        boardUrl = `${mainUrl}/bbs/${boardName}/index${
            titleList.prePageNumber
        }.html`;
        prePageNumber = titleList.prePageNumber;
        items.push(...titleList.items);
    }
    if (isScrapContent) {
        const contentItems = [];
        const itemsLength = items.length;
        const batch = itemsLength / pageCounts;
        console.log(`總共：${itemsLength}`);

        for (let i = 0; i < itemsLength / batch + 1; i++) {
            const steps = items
                .splice(0, batch)
                .map(step => scrapContent(step));
            if (steps.length) {
                contentItems.push(...(await Promise.all(steps)));
            }
            console.log(`剩下：${items.length}`);
        }
        return { prePage: boardUrl, prePageNumber, items: contentItems };
    }
    return { prePage: boardUrl, prePageNumber, items };
};
