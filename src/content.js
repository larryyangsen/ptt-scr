import cheerio from 'cheerio';
import moment from 'moment';
const mainContentSelector = 'div#main-content';
const athorSelector =
    'div#main-content .article-metaline:nth-child(1) .article-meta-value';
const titleSelector =
    'div#main-content .article-metaline:nth-child(3) .article-meta-value';
const timeSelector =
    'div#main-content .article-metaline:nth-child(4) .article-meta-value';

const pushSelector = 'div#main-content div.push';
const spanF2Selector = 'div#main-content span.f2';
const contentLinkSelector = 'div#main-content a';
const ipReg = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
export default async html => {
    const $ = cheerio.load(html, {
        withDomLvl1: true,
        normalizeWhitespace: true,
        xmlMode: true
    });
    const athor = $(athorSelector).text();
    const title = $(titleSelector).text();
    const datetime = $(timeSelector).text();
    let publishIP = '';
    let editedIP = '';
    $(spanF2Selector)
        .contents()
        .map((i, el) => {
            if (el.data && el.data.includes('發信站') && ipReg.test(el.data)) {
                publishIP = ipReg.exec(el.data)[0];
            }
            if (el.data && el.data.includes('編輯') && ipReg.test(el.data)) {
                editedIP = ipReg.exec(el.data)[0];
            }
            return '';
        });
    const push = [];
    const neutral = [];
    const boo = [];

    $(pushSelector).map((i, el) => {
        const tag = $(el)
            .children()
            .filter('.push-tag')
            .text()
            .trim();
        const userid = $(el)
            .children()
            .filter('.push-userid')
            .text()
            .trim();
        const content = $(el)
            .children()
            .filter('.push-content')
            .text()
            .trim()
            .replace(':', '');
        const ip = $(el)
            .children()
            .filter('.push-ipdatetime')
            .text()
            .trim()
            .match(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g);
        const time = $(el)
            .children()
            .filter('.push-ipdatetime')
            .text()
            .trim()
            .match(/(\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2})/g);
        // console.log(content);
        // console.log(tag);
        const item = { userid, content };
        ip && Object.assign(item, { ip: ip.join() });
        time && Object.assign(item, { time: time.join() });

        tag === '推' && push.push(item);
        tag === '→' && neutral.push(item);
        tag === '噓' && boo.push(item);

        return 0;
    });
    const urls = [];
    $(contentLinkSelector).map((i, el) => {
        $(el).text() && urls.push($(el).text());
        return urls;
    });
    const content = $(mainContentSelector)
        .children()
        .remove()
        .end()
        .text();

    return {
        athor,
        title,
        datetime,
        urls,
        content,
        publishIP,
        editedIP,
        push,
        boo,
        neutral
    };
};
