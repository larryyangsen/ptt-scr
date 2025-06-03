import request from './request';
import cheerio from 'cheerio';
import get from './getUrlContent';

const mainContentSelector = 'div#main-content';
const authorSelector = 'div#main-content .article-metaline:nth-child(1) .article-meta-value';
const titleSelector = 'div#main-content .article-metaline:nth-child(3) .article-meta-value';
const timeSelector = 'div#main-content .article-metaline:nth-child(4) .article-meta-value';

const pushSelector = 'div#main-content div.push';
const spanF2Selector = 'div#main-content span.f2';
const contentLinkSelector = 'div#main-content a';
const ipReg = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
const isStr = (str: unknown): str is string => typeof str === 'string';
const isUrl = (str: unknown): boolean => isStr(str) && (/^((https?|ftp|file):\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/).test(str);

export interface Comment { // Exporting
    tag: string;
    userid: string;
    content: string;
    ip?: string;
    time?: string;
}

export interface ArticleContent { // Exporting
    author: string;
    title: string;
    datetime: string;
    urls: string[];
    quoteFrom: string[];
    quote: string[];
    content: string;
    publishIP: string;
    editedIP: string;
    reply: Comment[];
    push: Comment[];
    boo: Comment[];
    neutral: Comment[];
}

export interface ArticleInput { // Exporting
    link?: string;
    title?: string; // From list page, if provided
    // other properties from list page if any
    content?: ArticleContent; // This will be added by this function
}

const initItemLink = (item: string | ArticleInput): ArticleInput => (isStr(item) ? (isUrl(item) ? { link: item } : {}) : item);

export default async (item: string | ArticleInput): Promise<ArticleInput> => {
    const processedItem: ArticleInput = Object.assign({}, initItemLink(item));
    if (!processedItem.link) {
        return {}; // Or perhaps throw an error
    }
    const session = await request(); // session is now RequestAPI
    const html = await get(session, processedItem.link); // No longer needs 'as string'
    const $ = cheerio.load(html, {
        // withDomLvl1: true, // Option likely deprecated or misnamed
        normalizeWhitespace: true,
        xmlMode: true // xmlMode is useful for PTT's HTML structure
    });
    const author = $(authorSelector).text();
    const title = $(titleSelector).text();
    const datetime = $(timeSelector).text();
    let publishIP = '';
    let editedIP = '';
    $(spanF2Selector)
        .contents()
        .map((i, elNode) => {
            // Check if elNode is a TextNode (type 'text') and then access data
            if (elNode.type === 'text') {
                const textNode = elNode as any; // Reverting to 'as any' for .data due to Cheerio typing issues
                if (textNode.data && textNode.data.includes('發信站') && ipReg.test(textNode.data)) {
                    const match = ipReg.exec(textNode.data);
                    if (match) publishIP = match[0];
                }
                if (textNode.data && textNode.data.includes('編輯') && ipReg.test(textNode.data)) {
                    const match = ipReg.exec(textNode.data);
                    if (match) editedIP = match[0];
                }
            }
            return '';
        });
    const reply: Comment[] = [];
    const push: Comment[] = [];
    const neutral: Comment[] = [];
    const boo: Comment[] = [];

    $(pushSelector).map((i, el) => {
        const tagElement = $(el).children().filter('.push-tag');
        const useridElement = $(el).children().filter('.push-userid');
        const contentElement = $(el).children().filter('.push-content');
        const ipdatetimeElement = $(el).children().filter('.push-ipdatetime');

        const tag = tagElement.text().trim();
        const userid = useridElement.text().trim();
        const content = contentElement.text().trim().replace(':', '');

        const ipMatch = ipdatetimeElement.text().trim().match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g);
        const timeMatch = ipdatetimeElement.text().trim().match(/(\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2})/g);

        const commentItem: Comment = { tag, userid, content };
        if (ipMatch) Object.assign(commentItem, { ip: ipMatch.join() });
        if (timeMatch) Object.assign(commentItem, { time: timeMatch.join() });

        reply.push(commentItem);
        if (tag === '推') push.push(commentItem);
        if (tag === '→') neutral.push(commentItem);
        if (tag === '噓') boo.push(commentItem);
        return 0;
    });
    const urls: string[] = [];
    $(contentLinkSelector).map((i, el) => {
        const text = $(el).text();
        if (text) urls.push(text);
        return urls; // map function expects a return, though not strictly necessary here
    });

    const quoteFrom: string[] = [];
    $(mainContentSelector)
        .children('.f2')
        .each((index, ele) => {
            quoteFrom.push($(ele).text());
        });

    const quote: string[] = [];
    $(`${mainContentSelector}`)
        .children('.f6')
        .each((index, ele) => {
            quote.push($(ele).text());
        });

    const mainContentText = $(mainContentSelector)
        .clone()    // Clone to avoid modifying the original selection for quote/quoteFrom
        .children() // Select all children
        .remove()   // Remove children
        .end()      // Go back to the original selection (mainContentSelector)
        .text();    // Get the text of mainContentSelector, now without children

    processedItem.content = {
        author,
        title,
        datetime,
        urls,
        quoteFrom,
        quote,
        content: mainContentText,
        publishIP,
        editedIP,
        reply,
        push,
        boo,
        neutral
    };
    return processedItem;
};
