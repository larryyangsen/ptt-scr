import Request from 'request';
import getUrlContent from './getUrlContent';
import cheerio from 'cheerio';
import { URL } from 'url';
import querystring from 'querystring';
const request = Request.defaults();
const google = 'https://www.google.com';
const googleSearch = `${google}/search`;
const site = '+site:ptt.cc';
const itemElector = 'div.g';
const linkSelector = 'h3.r a';
const descSelector = 'div.s span.st';
const nextSelector = 'td.b > a#pnnext';
const getSearchResultHTML = async url => await getUrlContent(request, url.toString());
const getSearchUrl = (url, userName) => {
    url = new URL(url);
    // const start = url.searchParams.get('start') || 0;
    // console.log(start);
    url.searchParams.set('q', `${userName}${site}`);
    url.searchParams.set('oq', `${userName}${site}`);
    url.searchParams.set('ie', 'UTF-8');
    url.searchParams.set('lang', 'tw');
    url.searchParams.set('tld', 'tw');
    url.searchParams.set('sourceid', 'chrome');
    // url.searchParams.set('start', start);
    url.searchParams.set('num', 100);
    // console.log(url);

    return url;
};
const parseHtml = async (html, userName, contents = []) => {
    let $ = cheerio.load(html);
    // const next = $(nextSelector).attr('href');
    // console.log(next);
    // let nextLink = next && new URL(`${google}${next}`);

    $(itemElector).each((i, ele) => {
        $ = $.load(ele);
        let link = '';
        const linkEle = $(linkSelector);
        const descEle = $(descSelector);
        const linkObj = querystring.parse(linkEle.attr('href'));
        const title = linkEle.text();
        const text = descEle.text();
        if (linkObj['/url?q']) {
            link = linkObj['/url?q'];
        }
        // console.log(i);
        // console.log(title);
        // console.log(link);
        // console.log(text);
        contents.push({
            title,
            link,
            text
        });
    });
    // if (nextLink) {
    //     nextLink = getSearchUrl(nextLink, userName);
    //     const nextHtml = await getSearchResultHTML(nextLink);
    //     return await parseHtml(nextHtml, userName, contents);
    // }
    return contents;
};
export default async userName => {
    const googleSearchUrl = getSearchUrl(new URL(googleSearch), userName);
    const userGoogleHTML = await getSearchResultHTML(googleSearchUrl);
    const contents = await parseHtml(userGoogleHTML, userName);
    // console.log(contents.length);
    return contents;
};
